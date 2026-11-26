import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { Pool } from "pg";

export const runtime = "nodejs";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function getUserId(request: NextRequest): Promise<number | null> {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return Number(payload.sub);
  } catch {
    return null;
  }
}

const CONVERSATION_FIELDS = `
  c.id AS conversation_id,
  u.id AS user_id,
  u.username,
  u.email,
  (SELECT content FROM messages m
    WHERE m.conversation_id = c.id
    ORDER BY m.sent_at DESC LIMIT 1) AS last_message,
  (SELECT COUNT(*) FROM messages m
    WHERE m.conversation_id = c.id
      AND m.sender_id <> me.user_id
      AND m.is_read = false) AS unread_count`;

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }

  try {
    const result = await pool.query(
      `SELECT ${CONVERSATION_FIELDS}
       FROM conversations c
       JOIN conversation_participants me
         ON me.conversation_id = c.id AND me.user_id = $1
       JOIN conversation_participants other
         ON other.conversation_id = c.id AND other.user_id <> $1
       JOIN app_users u ON u.id = other.user_id
       ORDER BY c.created_at DESC`,
      [userId],
    );

    return NextResponse.json({ conversations: result.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не удалось загрузить диалоги" },
      { status: 500 },
    );
  }
}

async function fetchConversation(userId: number, conversationId: number) {
  const conversation = await pool.query(
    `SELECT ${CONVERSATION_FIELDS}
     FROM conversations c
     JOIN conversation_participants me
       ON me.conversation_id = c.id AND me.user_id = $1
     JOIN conversation_participants other
       ON other.conversation_id = c.id AND other.user_id <> $1
     JOIN app_users u ON u.id = other.user_id
     WHERE c.id = $2`,
    [userId, conversationId],
  );

  return conversation.rows[0];
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }

  try {
    const { targetUserId } = await request.json();
    const target = Number(targetUserId);

    if (!target || Number.isNaN(target) || target === userId) {
      return NextResponse.json(
        { error: "Некорректный пользователь" },
        { status: 400 },
      );
    }

    const targetExists = await pool.query(
      "SELECT id FROM app_users WHERE id = $1",
      [target],
    );

    if (targetExists.rowCount === 0) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 },
      );
    }

    // Диалог с этим пользователем уже существует? Тогда не плодим дубли
    const existing = await pool.query(
      `SELECT c.id FROM conversations c
       JOIN conversation_participants a
         ON a.conversation_id = c.id AND a.user_id = $1
       JOIN conversation_participants b
         ON b.conversation_id = c.id AND b.user_id = $2
       LIMIT 1`,
      [userId, target],
    );

    if (existing.rowCount && existing.rowCount > 0) {
      const conversation = await fetchConversation(userId, existing.rows[0].id);

      return NextResponse.json({ conversations: [conversation] });
    }

    // Создаём новый диалог и добавляем в него обоих участников
    const created = await pool.query(
      `INSERT INTO conversations (type, created_by)
       VALUES ('private', $1)
       RETURNING id`,
      [userId],
    );

    const conversationId = created.rows[0].id;

    await pool.query(
      `INSERT INTO conversation_participants (conversation_id, user_id)
       VALUES ($1, $2), ($1, $3)`,
      [conversationId, userId, target],
    );

    const conversation = await fetchConversation(userId, conversationId);

    return NextResponse.json(
      { conversations: [conversation] },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не удалось создать диалог" },
      { status: 500 },
    );
  }
}

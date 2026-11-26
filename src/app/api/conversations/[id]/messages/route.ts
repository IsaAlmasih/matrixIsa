import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { Pool } from "pg";

export const runtime = "nodejs";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // тут была ошибка в прошлом сообщении — было DB_PASSWORD, теперь DB_NAME
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }

  const { id } = await params;
  const conversationId = Number(id);

  if (!conversationId || Number.isNaN(conversationId)) {
    return NextResponse.json({ error: "Некорректный диалог" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      `SELECT m.id,
              m.content,
              m.sent_at AS created_at,
              (m.sender_id = $1) AS is_mine
       FROM messages m
       JOIN conversation_participants p
         ON p.conversation_id = m.conversation_id AND p.user_id = $1
       WHERE m.conversation_id = $2
       ORDER BY m.sent_at ASC`,
      [userId, conversationId],
    );

    return NextResponse.json({ messages: result.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не удалось загрузить сообщения" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }

  const { id } = await params;
  const conversationId = Number(id);

  if (!conversationId || Number.isNaN(conversationId)) {
    return NextResponse.json({ error: "Некорректный диалог" }, { status: 400 });
  }

  try {
    const { content } = await request.json();

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Сообщение не может быть пустым" },
        { status: 400 },
      );
    }

    // Проверяем, что пользователь — участник этого диалога
    const access = await pool.query(
      `SELECT 1 FROM conversation_participants
       WHERE conversation_id = $1 AND user_id = $2`,
      [conversationId, userId],
    );

    if (access.rowCount === 0) {
      return NextResponse.json(
        { error: "Нет доступа к этому диалогу" },
        { status: 403 },
      );
    }

    const inserted = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, content)
       VALUES ($1, $2, $3)
       RETURNING id, content, sent_at`,
      [conversationId, userId, content.trim()],
    );

    // Отмечаем сообщения собеседника прочитанными
    await pool.query(
      `UPDATE messages
       SET is_read = true
       WHERE conversation_id = $1 AND sender_id <> $2 AND is_read = false`,
      [conversationId, userId],
    );

    const message = {
      ...inserted.rows[0],
      is_mine: true,
    };

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не удалось отправить сообщение" },
      { status: 500 },
    );
  }
}

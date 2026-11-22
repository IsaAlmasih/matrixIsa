
import { NextRequest, NextResponse } from "next/server";

import pool from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth";

export const runtime = "nodejs";

// Получение списка диалогов
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Необходима авторизация" },
        { status: 401 },
      );
    }

    const result = await pool.query(
      `
      SELECT
        c.id AS conversation_id,
        c.created_at,

        u.id AS user_id,
        u.username,
        u.email,

        last_message.content AS last_message,
        last_message.created_at AS last_message_at,

        COALESCE(unread.count, 0)::int AS unread_count

      FROM conversations c

      JOIN app_users u ON u.id =
        CASE
          WHEN c.user1_id = $1 THEN c.user2_id
          ELSE c.user1_id
        END

      LEFT JOIN LATERAL (
        SELECT content, created_at
        FROM messages
        WHERE conversation_id = c.id
        ORDER BY id DESC
        LIMIT 1
      ) last_message ON true

      LEFT JOIN LATERAL (
        SELECT COUNT(*) AS count
        FROM messages
        WHERE conversation_id = c.id
          AND sender_id != $1
          AND is_read = FALSE
      ) unread ON true

      WHERE c.user1_id = $1 OR c.user2_id = $1

      ORDER BY
        last_message.created_at DESC NULLS LAST,
        c.created_at DESC
      `,
      [user.id],
    );

    return NextResponse.json({
      conversations: result.rows,
    });
  } catch (error) {
    console.error("Get conversations error:", error);

    return NextResponse.json(
      { error: "Ошибка получения диалогов" },
      { status: 500 },
    );
  }
}

// Создание диалога
export async function POST(request: NextRequest) {
  const client = await pool.connect();

  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Необходима авторизация" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const targetUserId = Number(body.targetUserId);

    if (
      !Number.isSafeInteger(targetUserId) ||
      targetUserId <= 0 ||
      targetUserId === user.id
    ) {
      return NextResponse.json(
        { error: "Некорректный пользователь" },
        { status: 400 },
      );
    }

    const firstUserId = Math.min(user.id, targetUserId);
    const secondUserId = Math.max(user.id, targetUserId);

    await client.query("BEGIN");

    const targetUser = await client.query(
      "SELECT id FROM app_users WHERE id = $1",
      [targetUserId],
    );

    if (targetUser.rowCount === 0) {
      await client.query("ROLLBACK");

      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 },
      );
    }

    const conversation = await client.query(
      `
      INSERT INTO conversations (user1_id, user2_id)
      VALUES ($1, $2)
      ON CONFLICT (user1_id, user2_id)
      DO UPDATE SET user1_id = EXCLUDED.user1_id
      RETURNING id
      `,
      [firstUserId, secondUserId],
    );

    const conversationId = conversation.rows[0].id;

    await client.query(
      `
      INSERT INTO conversation_participants
        (conversation_id, user_id)
      VALUES
        ($1, $2),
        ($1, $3)
      ON CONFLICT (conversation_id, user_id) DO NOTHING
      `,
      [conversationId, firstUserId, secondUserId],
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        success: true,
        conversationId,
      },
      { status: 201 },
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Create conversation error:", error);

    return NextResponse.json(
      { error: "Ошибка создания диалога" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}


import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../..//lib/db";
import { getCurrentUser } from "../../../../../lib/auth";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Получение сообщений диалога
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    // Проверяем авторизацию
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Необходима авторизация" },
        { status: 401 }
      );
    }

    // Получаем ID диалога
    const { id } = await params;
    const conversationId = Number(id);

    if (!Number.isSafeInteger(conversationId) || conversationId <= 0) {
      return NextResponse.json(
        { error: "Некорректный ID диалога" },
        { status: 400 }
      );
    }

    // Проверяем, состоит ли пользователь в диалоге
    const conversation = await pool.query(
      `
        SELECT id
        FROM conversations
        WHERE id = $1
          AND (user1_id = $2 OR user2_id = $2)
      `,
      [conversationId, user.id]
    );

    if (conversation.rows.length === 0) {
      return NextResponse.json(
        { error: "Диалог не найден" },
        { status: 404 }
      );
    }

    // Отмечаем входящие сообщения как прочитанные
    await pool.query(
      `
        UPDATE messages
        SET is_read = TRUE
        WHERE conversation_id = $1
          AND sender_id != $2
          AND is_read = FALSE
      `,
      [conversationId, user.id]
    );

    // Получаем сообщения
    const result = await pool.query(
      `
        SELECT
          id,
          sender_id,
          content,
          created_at,
          (sender_id = $2) AS is_mine
        FROM messages
        WHERE conversation_id = $1
        ORDER BY id ASC
      `,
      [conversationId, user.id]
    );

    return NextResponse.json({
      messages: result.rows,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return NextResponse.json(
      { error: "Ошибка при получении сообщений" },
      { status: 500 }
    );
  }
}

// Отправка сообщения
export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    // Проверяем авторизацию
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Необходима авторизация" },
        { status: 401 }
      );
    }

    // Получаем ID диалога
    const { id } = await params;
    const conversationId = Number(id);

    if (!Number.isSafeInteger(conversationId) || conversationId <= 0) {
      return NextResponse.json(
        { error: "Некорректный ID диалога" },
        { status: 400 }
      );
    }

    // Получаем текст сообщения
    const body = await request.json();
    const content = body.content?.trim();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Введите текст сообщения" },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Сообщение не должно превышать 5000 символов" },
        { status: 400 }
      );
    }

    // Проверяем участие пользователя в диалоге
    const conversation = await pool.query(
      `
        SELECT id
        FROM conversations
        WHERE id = $1
          AND (user1_id = $2 OR user2_id = $2)
      `,
      [conversationId, user.id]
    );

    if (conversation.rows.length === 0) {
      return NextResponse.json(
        { error: "Диалог не найден" },
        { status: 404 }
      );
    }

    // Сохраняем сообщение
    const result = await pool.query(
      `
        INSERT INTO messages (
          conversation_id,
          sender_id,
          content
        )
        VALUES ($1, $2, $3)
        RETURNING
          id,
          sender_id,
          content,
          created_at,
          TRUE AS is_mine
      `,
      [conversationId, user.id, content]
    );

    return NextResponse.json(
      {
        success: true,
        message: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Send message error:", error);

    return NextResponse.json(
      { error: "Ошибка при отправке сообщения" },
      { status: 500 }
    );
  }
}

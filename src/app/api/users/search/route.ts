
import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
      return NextResponse.json(
        { error: "Необходима авторизация" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ users: [] });
    }

    const result = await pool.query(
      `
        SELECT id, username, email
        FROM app_users
        WHERE id != $1
          AND (
            username ILIKE $2
            OR email ILIKE $2
          )
        ORDER BY username
        LIMIT 20
      `,
      [currentUser.id, `%${query}%`]
    );

    return NextResponse.json({
      users: result.rows,
    });
  } catch (error) {
    console.error("Search users error:", error);

    return NextResponse.json(
      { error: "Ошибка поиска пользователей" },
      { status: 500 }
    );
  }
}

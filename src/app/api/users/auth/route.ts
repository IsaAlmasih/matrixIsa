import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "../../../../lib/db";
import { issueCode } from "../../../../lib/verify-code";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `SELECT id, username, email, password_hash
       FROM app_users
       WHERE email = $1`,
      [email],
    );

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 },
      );
    }

    const passwordOk = await bcrypt.compare(password, user.password_hash);

    if (!passwordOk) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 },
      );
    }

    // Пароль верный — выдаём код подтверждения, сессию пока НЕ даём
    await issueCode(user.email);

    return NextResponse.json({
      pending: true,
      email: user.email,
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Ошибка авторизации" }, { status: 500 });
  }
}

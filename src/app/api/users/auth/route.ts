import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import pool from "../../../../lib/db";

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
        { message: "Введите почту и пароль" },
        { status: 400 },
      );
    }

    // Ищем пользователя в PostgreSQL
    const result = await pool.query(
      `SELECT id, username, email, password_hash
       FROM app_users
       WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Неверная почта или пароль" },
        { status: 401 },
      );
    }

    const user = result.rows[0];

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Неверная почта или пароль" },
        { status: 401 },
      );
    }

    // Создаём JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET не задан");
    }

    const secretKey = new TextEncoder().encode(secret);

    const token = await new SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(user.id))
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secretKey);

    // Устанавливаем защищённую cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Авторизация успешна",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Authorization error:", error);

    return NextResponse.json(
      { message: "Ошибка при авторизации" },
      { status: 500 },
    );
  }
}

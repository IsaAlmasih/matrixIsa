import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "../../../../lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Введите корректную почту" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Пароль должен содержать минимум 8 символов" },
        { status: 400 }
      );
    }

    const existingUser = await pool.query(
      "SELECT id FROM app_users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "Пользователь с такой почтой уже существует" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);


    const result = await pool.query(
      `INSERT INTO app_users (username, email, password_hash)        VALUES ($1, $2, $3)        RETURNING id, username, email, created_at`,
      ["Пользователь", email, passwordHash]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Регистрация прошла успешно",
        user: result.rows[0],
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Ошибка при регистрации" },
      { status: 500 }
    );
  }
}
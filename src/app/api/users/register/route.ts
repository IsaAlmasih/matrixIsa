import { NextRequest, NextResponse } from "next/server";
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
    // Если username не прислали — берём часть email до собаки
    const username = String(body.username ?? "").trim() || email.split("@")[0];

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Пароль должен быть не короче 8 символов" },
        { status: 400 },
      );
    }

    const existingEmail = await pool.query(
      "SELECT id FROM app_users WHERE email = $1",
      [email],
    );

    if (existingEmail.rowCount !== 0) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 409 },
      );
    }

    // Имя может случайно совпасть с чужим — тогда добавим число
    let finalUsername = username;
    let suffix = 1;
    while (true) {
      const taken = await pool.query(
        "SELECT id FROM app_users WHERE username = $1",
        [finalUsername],
      );
      if (taken.rowCount === 0) break;
      finalUsername = `${username}${suffix}`;
      suffix += 1;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await pool.query(
      `INSERT INTO app_users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [finalUsername, email, passwordHash],
    );

    // Аккаунт создан, но сессию НЕ выдаём: вход — только через пароль + код
    return NextResponse.json(created.rows[0], { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Не удалось зарегистрироваться" },
      { status: 500 },
    );
  }
}

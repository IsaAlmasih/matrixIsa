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
    // Если username не прислали — берём часть email до собаки
    const username = String(body.username ?? "").trim() || email.split("@")[0];

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль должен быть не короче 6 символов" },
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
    const taken = await pool.query(
      "SELECT id FROM app_users WHERE username = $1",
      [finalUsername],
    );

    let suffix = 1;
    while (taken.rowCount !== 0) {
      finalUsername = `${username}${suffix}`;
      suffix += 1;
      const again = await pool.query(
        "SELECT id FROM app_users WHERE username = $1",
        [finalUsername],
      );
      if (again.rowCount === 0) break;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await pool.query(
      `INSERT INTO app_users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [finalUsername, email, passwordHash],
    );

    const user = created.rows[0];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET не задан в .env.local");
      return NextResponse.json(
        { error: "Ошибка конфигурации сервера" },
        { status: 500 },
      );
    }

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(user.id))
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json(user, { status: 201 });

    response.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Не удалось зарегистрироваться" },
      { status: 500 },
    );
  }
}

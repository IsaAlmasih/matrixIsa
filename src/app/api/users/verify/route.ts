import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import pool from "../../../../lib/db";
import { checkCode } from "../../../../lib/verify-code";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Нужны email и код" }, { status: 400 });
    }

    const ok = await checkCode(
      String(email).trim().toLowerCase(),
      "login",
      String(code).trim(),
    );

    if (!ok) {
      return NextResponse.json(
        { error: "Код неверный или истёк" },
        { status: 401 },
      );
    }

    const result = await pool.query(
      "SELECT id, username, email FROM app_users WHERE email = $1",
      [String(email).trim().toLowerCase()],
    );
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 401 },
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
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

    const response = NextResponse.json(user);
    response.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Ошибка подтверждения" },
      { status: 500 },
    );
  }
}

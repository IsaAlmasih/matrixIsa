
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export interface AuthUser {
  id: number;
  email: string;
}

export async function getCurrentUser(
  request: NextRequest,
): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET не задан");
    }

    const secretKey = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, secretKey);

    const id = Number(payload.sub);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return null;
    }

    if (typeof payload.email !== "string") {
      return null;
    }

    return {
      id,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

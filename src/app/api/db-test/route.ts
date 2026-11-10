import { NextResponse } from "next/server";
// import pool from "@/lib/db";

import pool from "../../../lib/db"
export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");

    return NextResponse.json({
      success: true,
      message: "PostgreSQL connected!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("PostgreSQL error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT NOW() as now, current_database() as db",
    );

    return NextResponse.json({
      success: true,
      message: "PostgreSQL connected!",
      time: result.rows[0].now,
      database: result.rows[0].db,
    });
  } catch (error) {
    console.error("PostgreSQL error:", error);

    return NextResponse.json(
      { success: false, message: "Database connection failed" },
      { status: 500 },
    );
  }
}

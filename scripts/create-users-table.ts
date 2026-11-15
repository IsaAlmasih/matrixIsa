import "dotenv/config";
import pool from "../src/lib/db";

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log("✅ Таблица users создана или уже существует");
  } catch (error) {
    console.error("❌ Ошибка при создании таблицы:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();

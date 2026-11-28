import bcrypt from "bcryptjs";
import pool from "./db";

export async function issueCode(email: string, purpose = "login") {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const codeHash = await bcrypt.hash(code, 10);

  await pool.query(
    "DELETE FROM verification_codes WHERE email = $1 AND purpose = $2",
    [email, purpose],
  );
  await pool.query(
    `INSERT INTO verification_codes (email, code_hash, purpose, expires_at)
     VALUES ($1, $2, $3, now() + interval '10 minutes')`,
    [email, codeHash, purpose],
  );

  // Пока почтового сервиса нет — код уходит в лог сервера.
  // Когда подключим SMTP, здесь будет sendEmail(email, code).
  console.log(`[КОД ПОДТВЕРЖДЕНИЯ] ${email}: ${code}`);

  return code;
}

export async function checkCode(
  email: string,
  purpose = "login",
  code: string,
) {
  const result = await pool.query(
    `SELECT id, code_hash, attempts FROM verification_codes
     WHERE email = $1 AND purpose = $2 AND expires_at > now()
     ORDER BY created_at DESC LIMIT 1`,
    [email, purpose],
  );

  const row = result.rows[0];
  if (!row) return false;

  if (row.attempts >= 5) {
    await pool.query("DELETE FROM verification_codes WHERE id = $1", [row.id]);
    return false;
  }

  const ok = await bcrypt.compare(code, row.code_hash);

  if (ok) {
    await pool.query("DELETE FROM verification_codes WHERE id = $1", [row.id]);
  } else {
    await pool.query(
      "UPDATE verification_codes SET attempts = attempts + 1 WHERE id = $1",
      [row.id],
    );
  }

  return ok;
}

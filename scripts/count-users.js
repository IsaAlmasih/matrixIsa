const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  const total = await pool.query("SELECT COUNT(*) FROM app_users");
  console.log("сего пользователей:", total.rows[0].count);

  const recent = await pool.query(
    `SELECT id, username, email FROM app_users
     ORDER BY id DESC LIMIT 10`
  );
  console.table(recent.rows);

  await pool.end();
})();

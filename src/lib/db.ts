import "server-only";
import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pool: Pool | undefined;
};

const pool =
  globalForPg.pool ??
  new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}

export default pool;

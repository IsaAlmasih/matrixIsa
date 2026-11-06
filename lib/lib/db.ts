import { Client } from "pg";

let client: Client | null = null;

export async function getClient(): Promise<Client> {
  if (client) {
    return client;
  }

  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

  await client.connect();
  return client;
}

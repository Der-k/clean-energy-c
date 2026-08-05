import mysql from "mysql2/promise";

// Reuse a single pool across hot reloads / lambda invocations.
// In Next.js dev mode, modules can be re-evaluated; stash the pool on
// globalThis so we don't open a fresh pool on every request.

declare global {
  // eslint-disable-next-line no-var
  var __livestreamDbPool: mysql.Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
  });
}

export const db = global.__livestreamDbPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  global.__livestreamDbPool = db;
}

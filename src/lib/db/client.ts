import "server-only";

import postgres, { type Sql } from "postgres";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL (or DIRECT_URL) is required for database access.");
}

const globalForDb = globalThis as typeof globalThis & {
  __pgClient__?: Sql;
};

const pgClient =
  globalForDb.__pgClient__ ??
  postgres(connectionString, {
    ssl: "require",
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__pgClient__ = pgClient;
}

export { pgClient as db };


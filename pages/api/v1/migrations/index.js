import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

const defaultMigrationOptions = {
  databaseUrl: process.env.DATABASE_URL,
  dir: join("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function migrations(request, response) {
  if (request.method === "POST") {
    const migrations = await migrationRunner(defaultMigrationOptions);
    return response.status(200).json(migrations);
  } else if (request.method === "GET") {
    const migrations = await migrationRunner(defaultMigrationOptions);
    return response.status(200).json(migrations);
  }
  return response.status(405).end();
}

export default migrations;

import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersionRes = await database.query("SHOW server_version;");
  const dbVersion = dbVersionRes.rows[0].server_version;

  const dbMaxConnectionsRes = await database.query("SHOW max_connections;");
  const dbMaxConnections = parseInt(
    dbMaxConnectionsRes.rows[0].max_connections,
  );

  const dbName = process.env.POSTGRES_DB;
  const dbConnectionsRes = await database.query({
    text: `SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [dbName],
  });
  const dbConnections = dbConnectionsRes.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
        opened_connections: dbConnections,
        max_connections: dbMaxConnections,
      },
    },
  });
}

export default status;

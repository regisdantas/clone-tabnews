import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

beforeAll(cleanDatabase);

test("POST /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(200);

  const respBody1 = await response1.json();
  expect(Array.isArray(respBody1)).toBe(true);
  expect(respBody1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const respBody2 = await response2.json();
  expect(Array.isArray(respBody2)).toBe(true);
  expect(respBody2.length).toBe(0);
});

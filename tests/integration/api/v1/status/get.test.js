test("GET /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const respBody = await response.json();
  console.log(respBody);
  expect(respBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(respBody.updated_at).toISOString();
  expect(parsedUpdatedAt).toBe(respBody.updated_at);

  expect(respBody.dependencies.database.version).toBe("18.3");

  expect(typeof respBody.dependencies.database.opened_connections).toBe(
    "number",
  );
  expect(respBody.dependencies.database.opened_connections).toBe(1);

  expect(typeof respBody.dependencies.database.max_connections).toBe("number");
});

import request from "supertest";
import fs from "fs";
import { client } from "../config/db";

// @ts-ignore
beforeAll(async () => {
  const createTableSql = fs.readFileSync("create-tables.sql", "utf8");
  await client.query(createTableSql);
});

// @ts-ignore
beforeEach(async () => {
  
  const tables = (
    await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    )
  ).rows;
  for (const table of tables) {
    await client.query(
      `TRUNCATE TABLE ${table.table_name} RESTART IDENTITY CASCADE;`,
    );
  }
});

// @ts-ignore
afterAll(async () => {
  await client.end();
});

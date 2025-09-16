import fs from "fs";
import { beforeAll, beforeEach, afterAll } from "vitest";
import { client } from "../config/db";
import { redisClient } from "../config/redis";

beforeAll(async () => {
  const createTableSql = fs.readFileSync("create-tables.sql", "utf8");
  await client.query(createTableSql);
});

beforeEach(async () => {
  // Clear Redis cache before each test
  await redisClient.flushdb();

  // Clear all database tables
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

afterAll(async () => {
  await redisClient.quit();
  await client.end();
});

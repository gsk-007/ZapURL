import { Client } from "pg"

export const client = new Client({
  connectionString: process.env.DB_URL
})

export const testClient = new Client({
  connectionString: process.env.TEST_DB_URL
})

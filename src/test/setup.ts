import request from 'supertest'
import {Client} from 'pg'
import fs from 'fs'

const client = new Client({
  connectionString: process.env.DB_URL
})

// @ts-ignore
beforeAll(async () => {
  await client.connect()
  const createTableSql = fs.readFileSync('create_tables.sql','utf8' )
  await client.query(createTableSql)
})

// @ts-ignore
beforeEach(async () => {
  const tables = (await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")).rows
  for(const table of tables){
    await client.query(`TRUNCATE TABLE ${table.table_name} RESTART IDENTITY CASCADE;`)
  }
})

// @ts-ignore
afterAll(async () => {
  await client.end()
})


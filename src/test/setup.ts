import request from 'supertest'
import fs from 'fs'
import {testClient} from '../config/db'


// @ts-ignore
beforeAll(async () => {
  await testClient.connect()
  const createTableSql = fs.readFileSync('create-tables.sql','utf8' )
  await testClient.query(createTableSql)
})

// @ts-ignore
beforeEach(async () => {
  const tables = (await testClient.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")).rows
  for(const table of tables){
    await testClient.query(`TRUNCATE TABLE ${table.table_name} RESTART IDENTITY CASCADE;`)
  }
})

// @ts-ignore
afterAll(async () => {
  await testClient.end()
})


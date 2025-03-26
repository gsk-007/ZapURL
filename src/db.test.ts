import {expect, test} from 'vitest'
import {client} from './config/db'

test('a url table is created in the database', async () => {
  const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';")
  expect(res.rowCount).toBe(1)
})

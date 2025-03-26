import { Client } from "pg"

let client:Client
if(process.env.NODE_ENV == 'developement'){
  client = new Client({
    connectionString: process.env.DB_URL
  })
}else if (process.env.NODE_ENV == 'test'){
  client = new Client({
    connectionString: process.env.TEST_DB_URL
  })
}

export {client}


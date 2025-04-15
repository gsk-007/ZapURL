import { Pool} from "pg"

let client:Pool
if(process.env.NODE_ENV == 'developement'){
  client = new Pool({
    connectionString: process.env.DB_URL
  })
}else if (process.env.NODE_ENV == 'test'){
  client = new Pool({
    connectionString: process.env.TEST_DB_URL,
  })
  client.on('error', (err) => {
    console.error('something bad has happened!', err.stack)
  })
}

export {client}


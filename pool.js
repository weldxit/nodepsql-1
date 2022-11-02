const { Pool} = require('pg')
const connectionString = process.env.connString
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  }
})

module.exports=pool

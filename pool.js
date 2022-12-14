const { Pool} = require('pg')
const connectionString = 'postgres://subha:yigN6t5mtFNg1smmRb8L6OYGPeOBjGIJ@dpg-cd557gaen0hugpkke9bg-a.oregon-postgres.render.com/edb_efaz'
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  }
})

module.exports=pool

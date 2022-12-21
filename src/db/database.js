const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'aiyxkkhkyzbzcj',
  host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
  database: 'd21kckg79171mv',
  password: 'be3732393f80c2f2cfa73adcc21d2a2a30ea81c6854c4ff6882384d70535e624',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  user: 'aiyxkkhkyzbzcj',
  host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
  database: 'd21kckg79171mv',
  password: 'be3732393f80c2f2cfa73adcc21d2a2a30ea81c6854c4ff6882384d70535e624',
  port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

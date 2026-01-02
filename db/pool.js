require("dotenv").config();
const { Pool } = require("pg");

//Dev
const pool = new Pool({
  user: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PASSWORD,
  host: process.env.DEV_DB_HOST,
  port: process.env.DEV_DB_PORT,
  database: process.env.DEV_DB_NAME,
});


module.exports = pool;
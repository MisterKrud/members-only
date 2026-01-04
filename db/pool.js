require('dotenv').config();
const { Pool } = require('pg');


const isProd = process.env.RENDER === 'true' || process.env.NODE_ENV?.trim() === 'production';

let pool;

if (isProd) {

  pool = new Pool({
    connectionString: process.env.PROD_DB,
    ssl: {
      rejectUnauthorized: false, 
    },
  });
  console.log('\x1b[41m%s\x1b[0m', ' >>> PROD: Connected to Neon ');
} else {
  // Use local settings for Dev (WSL)
  pool = new Pool({
    connectionString: process.env.DEV_DB,
    ssl: false
  });
  console.log('\x1b[42m%s\x1b[0m', ' >>> DEV: Connected to Local ');
}

module.exports = pool;
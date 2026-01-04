require("dotenv").config();
const { Pool } = require("pg");

const isProd = process.NODE_ENV === 'production';
if (isProd) {
    console.log('\x1b[41m%s\x1b[0m', ' RUNNING IN PRODUCTION MODE '); 
    // This prints white text on a RED background
} else {
    console.log('\x1b[42m%s\x1b[0m', ' Running in Development mode ');
    // This prints white text on a GREEN background
}

const pool = new Pool({
 connectionString: isProd ? process.env.PROD_DB_URL : process.env.DEV_DB_URL,
ssl: process.env.NODE_ENV?.trim() === 'production' ? { rejectUnauthorized: false } : false
});


module.exports = pool;
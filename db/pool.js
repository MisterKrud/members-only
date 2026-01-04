require('dotenv').config();
const { Pool } = require('pg');

// 1. Robust Environment Check
const isProd = process.env.RENDER === 'true' || process.env.NODE_ENV?.trim() === 'production';

// 2. Clear Logging (helps you debug the Render console)
console.log(`Environment: ${isProd ? 'PRODUCTION (Render)' : 'DEVELOPMENT (WSL)'}`);

// 3. Pool Configuration
const pool = new Pool({
  // Use the full string to avoid individual variable conflicts
  connectionString: isProd ? process.env.PROD_DB : process.env.DEV_DB,
  ssl: isProd ? {
    require: true,
  } : false,
  connectionTimeoutMillis: 5000,
});

module.exports = pool;
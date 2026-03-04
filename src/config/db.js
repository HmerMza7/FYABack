const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.BD_STRING,
});

module.exports = pool;

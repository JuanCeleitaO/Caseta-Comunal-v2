const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

pool.on('connect', () => {
  console.log('PostgreSQL: Conexión establecida con éxito.');
});

pool.on('error', (err) => {
  console.error('PostgreSQL: Error inesperado en el cliente.', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
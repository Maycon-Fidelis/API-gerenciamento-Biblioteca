// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'livraria',
  password: 'projectspostgresql', // alterar
  port: 5432, // alterar
});

module.exports = pool;

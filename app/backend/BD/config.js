require('dotenv').config();
const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
  connection.query = promisify(connection.query);
});

module.exports = pool;

import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'order_db',
  port: 3310,
}

const pool = mysql.createPool(config);

export default pool;
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  waitForConnections: true,
  queueLimit: 0,
  multipleStatements: true,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.log("Database Connection Failed: ", error);
  } else {
    console.log("Database Connected Successfully");
    connection.release();
  }
});

// Create Tables
const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const createdOrderTable = `
  CREATE TABLE IF NOT EXISTS orders(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

pool
  .promise()
  .query(`${createUserTable}; ${createdOrderTable};`)
  .then(() => {
    console.log("All Table's are Ready");
  })
  .catch((err) => {
    console.log("Error While Creating Table's", err);
  });

module.exports = pool.promise();

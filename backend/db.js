const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//Middleware to ensure MySQL connection
(async () => {
  try {
    await connection.getConnection(); // This line ensures the pool is initialized and a connection is established
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
})();

module.exports = connection;

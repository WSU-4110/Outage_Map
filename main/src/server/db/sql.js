const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "outageMapDB",
  host: "localhost",
  port: "3306",
});

module.exports = connection.promise();

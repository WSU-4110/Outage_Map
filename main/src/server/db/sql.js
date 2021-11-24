const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "outageMapV2",
  host: "localhost",
  port: "3306",
});

module.exports = connection.promise();

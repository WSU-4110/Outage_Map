//DATABASE FOR LOCAL HOST

// const mysql = require("mysql2");

// const connection = mysql.createPool({
//   connectionLimit: 10,
//   password: "password",
//   user: "root",
//   database: "outageMapV2",
//   host: "localhost",
//   port: "3306",
// });

// module.exports = connection.promise();

//DATABASE FOR HEROKU

const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 10,
  password: "d5u1n41d3wr1ja4n",
  user: "	lfr9ki8emh8mp79r",
  database: "s3hc1xsxl83o7wwg",
  host: "w3epjhex7h2ccjxx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: "3306",
});

module.exports = connection.promise();

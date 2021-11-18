const mysql = require("mysql2");

//Implementing Singleton Design Pattern for database connection

class dbConnectionSingleton{
  
  //The '#' prefix means private, according to MDN Web Docs
  static #CONNECTION;
  
  //Private constructor
  #constructor() {
  this.#CONNECTION = mysql.createPool({
    connectionLimit: 10,
    password: "password",
    user: "root",
    database: "outageMapV2",
    host: "localhost",
    port: "3306",
});
   }

  static getConnection() {
    if (this.#CONNECTION == null)
      this.#CONNECTION = new dbConnectionSingleton()
    return this.#CONNECTION
    

  }

}


module.exports = dbConnectionSingleton;

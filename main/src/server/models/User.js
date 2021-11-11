const db = require("../db/sql");
const bcrypt = require("bcrypt");

/*
 * User Class for User table in databse
 * This class will contain all SQL statements related to User Table
 */
class User {
  constructor(user_email, user_password) {
    this.user_email = user_email;
    this.user_password = user_password;
  }

  //Signup functionality. Inserts a new user into the User table.
  register() {
    let sql = `
        INSERT INTO users (user_email, user_password)
         VALUES ('${this.user_email}', '${this.user_password}');`;
    return db.execute(sql);
  }

  //Validation upon User login
  //Compare the password the user entered to the hashed
  //password in the database. Return true if passwords match.
  async validateUser() {
    let isValid = false;
    let sql = `SELECT * FROM users WHERE user_email = '${this.user_email}';`;
    const [result] = await db.execute(sql);
    if (result[0] != null) {
      isValid = true;
    }
    return isValid;
  }
}
module.exports = User;

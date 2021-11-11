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
    //Encrypt User Password
    bcrypt.hash(this.user_password, 10, (err, hash) => {
      if (err) throw err;
      else {
        let sql = `
        INSERT INTO users (user_email, user_password)
         VALUES ('${this.user_email}', '${hash}');`;
        //console.log(hash);
        return db.execute(sql);
      }
    });
  }

  //Validation upon User login
  //Compare the password the user entered to the hashed
  //password in the database. Return true if passwords match.
  async validateUser() {
    //console.log(this.user_email);
    let sql = `SELECT * FROM users WHERE user_email = '${this.user_email}';`;
    const [result] = await db.execute(sql);
    //console.log(result);
    const isValid = await bcrypt.compare(
      this.user_password,
      result[0].user_password
    );
    console.log(this.user_password);
    console.log(result[0].user_password);
    return isValid;
  }
}
module.exports = User;

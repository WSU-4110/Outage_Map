const db = require("../db/sql");

class User {
  constructor(user_email, user_password) {
    this.user_email = user_email;
    this.user_password = user_password;
  }

  register() {
    let sql = `
        INSERT INTO users (user_email, user_password)
         VALUES ('${this.user_email}', '${this.user_password}');`;
    return db.execute(sql);
  }

  static validateUser(user_email, user_password) {
    let sql = `SELECT * FROM users WHERE user_email = '${user_email}' 
         AND user_password = '${user_password}';`;
    return db.execute(sql);
  }
}
module.exports = User;

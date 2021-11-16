const db = require("../db/sql");

/*
 * Outage Class for Outage table in databse
 * This class will contain all SQL statements related to Outage Table
 */
class Outage {
  constructor(
    user_email,
    service_type,
    service_name,
    latitude,
    longitude,
    outage_description
  ) {
    this.user_email = user_email;
    this.service_type = service_type;
    this.service_name = service_name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.outage_description = outage_description;
  }

  //Function to save the newly reported outage to the database
  save() {
    let outageDate = new Date();
    let year = outageDate.getFullYear();
    let month = outageDate.getMonth() + 1;
    let day = outageDate.getDate();
    let dateCreated = `${year}-${month}-${day}`;

    let sql = `INSERT INTO outages (user_email, service_type, service_name, latitude, longitude, outage_description, date_created) VALUES ('${this.user_email}', '${this.service_type}', '${this.service_name}', '${this.latitude}', '${this.longitude}', '${this.outage_description}', '${dateCreated}');`;
    return db.execute(sql);
  }

  //SQL query function to get outages from database for
  //outage map page
  static findAll() {
    let sql = "SELECT * FROM outages";
    return db.execute(sql);
  }

  static userProfile(email) {   
    let sql = `SELECT * FROM outages where user_email = '${email}'`;
    return db.execute(sql);
  }

  close() {
    let sql = `UPDATE OUTAGES SET outage_status = 'Closed' WHERE user_email = '${this.user_email}' and service_type = '${this.service_type}' and service_name = '${this.service_name}' and latitude = '${this.latitude}'and longitude = '${this.longitude}' and outage_description = '${this.outage_description}';`;
    return db.execute(sql);
  }
}
module.exports = Outage;

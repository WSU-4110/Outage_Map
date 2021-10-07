const db = require("../db/sql");

class Outage {
  constructor(
    user_id,
    service_type,
    service_name,
    outage_street,
    outage_city,
    outage_state,
    outage_description,
    outage_status
  ) {
    this.user_id = user_id;
    this.service_type = service_type;
    this.service_name = service_name;
    this.outage_street = outage_street;
    this.outage_city = outage_city;
    this.outage_state = outage_state;
    this.outage_description = outage_description;
    this.outage_status = outage_status;
  }

  save() {
    let outageDate = new Date();
    let year = outageDate.getFullYear();
    let month = outageDate.getMonth() + 1;
    let day = outageDate.getDate();
    let dateCreated = `${year}-${month}-${day}`;

    let sql = `
            INSERT INTO outages (
                user_id,
                service_type,
                service_name,
                outage_street,
                outage_city,
                outage_state,
                outage_description,
                outage_status,
                date_created  
            )
            VALUES (
                '${this.user_id}',
                '${this.service_type}',
                '${this.service_name}',
                '${this.outage_street}',
                '${this.outage_city}',
                '${this.outage_state}',
                '${this.outage_description}',
                '${this.outage_status}',
                '${dateCreated}'
            )
        ;`;

    const [newOutage, _] = db.execute(sql);
    return newOutage;
  }

  static findAll() {
    let sql = "SELECT * FROM outages;";
    return db.execute(sql);
  }
}
module.exports = Outage;

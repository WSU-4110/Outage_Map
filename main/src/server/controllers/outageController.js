const Outage = require("../models/Outage");

exports.getAllOutages = async (req, res, next) => {
  try {
    const [outages, _] = await Outage.findAll();
    res.status(200).json({ outages });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewOutage = async (req, res, next) => {
  try {
    let {
      user_id,
      service_type,
      service_name,
      outage_street,
      outage_city,
      outage_state,
      outage_description,
      outage_status,
    } = req.body;
    let outage = new Outage(
      user_id,
      service_type,
      service_name,
      outage_street,
      outage_city,
      outage_state,
      outage_description,
      outage_status
    );

    outage = await outage.save();
    res.status(201).json({ message: "Outage Created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
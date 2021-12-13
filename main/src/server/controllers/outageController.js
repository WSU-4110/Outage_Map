const Outage = require("../models/Outage");

exports.getAllOutages = async (req, res, next) => {
  try {
    const [outages, _] = await Outage.findAll();
    res.status(200).json({ outages });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

exports.createNewOutage = async (req, res, next) => {
  try {
    let {
      user_email,
      service_type,
      service_name,
      latitude,
      longitude,
      outage_description,
    } = req.body;
    let outage = new Outage(
      user_email,
      service_type,
      service_name,
      latitude,
      longitude,
      outage_description
    );

    outage = await outage.save();
    res.status(201).json({ message: "Outage Created" });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

exports.profilePage = async (req, res, next) => {
  try {
    let { user_email } = req.body;
    const [profile, _] = await Outage.userProfile(user_email);
    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    res.status(404);
    next(error);
  }
};

exports.closeOutage = async (req, res, next) => {
  try {
    let { outage_id } = req.body;
    await Outage.close(outage_id);
    res.status(204).json({ message: "Outage Closed" });
  } catch (error) {
    console.log(error);
    res.status(404);
    next(error);
  }
};

exports.extendOutage = async (req, res, next) => {
  try {
    let { outage_id } = req.body;
    await Outage.extendOutage(outage_id);
    res.status(204).json({ message: "Outage Extended" });
  } catch (error) {
    console.log(error);
    res.status(404);
    next(error);
  }
};

const express = require("express");
const router = express.Router();
const outageController = require("../controllers/outageController");

router.route("/").get(outageController.getAllOutages);
router.route("/outages").get(outageController.getAllOutages);
router.route("/outage-new").post(outageController.createNewOutage);

module.exports = router;

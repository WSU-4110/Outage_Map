const express = require("express");
const router = express.Router();
const outageController = require("../controllers/outageController");
const userController = require("../controllers/userController");

//Routes for Outage Page
router.route("/").get(outageController.getAllOutages);
router.route("/outages").get(outageController.getAllOutages);
router.route("/outage-new").post(outageController.createNewOutage);

//Routes for login and signup
router.route("/login").get(userController.login);
router.route("/signup").post(userController.signup);

module.exports = router;

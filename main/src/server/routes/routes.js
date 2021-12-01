const express = require("express");
const router = express.Router();
const outageController = require("../controllers/outageController");
const userController = require("../controllers/userController");

//Routes for Outage Page
router.route("/").get(outageController.getAllOutages);
router.route("/api/outages").get(outageController.getAllOutages);
router.route("/api/outage-new").post(outageController.createNewOutage);
router.route("/api/outage-close").post(outageController.closeOutage);
router.route("/api/profile").post(outageController.profilePage);

//Routes for login and signup
router.route("/api/login").post(userController.login);
router.route("/api/signup").post(userController.signup);

module.exports = router;

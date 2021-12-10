const express = require("express");
const router = express.Router();
const outageController = require("../controllers/outageController");
const userController = require("../controllers/userController");

//Routes for Outage Page
router.route("/").get(outageController.getAllOutages);
router.route("/outages").get(outageController.getAllOutages);
router.route("/outage-new").post(outageController.createNewOutage);
router.route("/outage-close").post(outageController.closeOutage);
router.route("/profile").post(outageController.profilePage);

//Routes for login and signup
router.route("/login").post(userController.login);
router.route("/signup").post(userController.signup);
router.route("/reset").post(userController.reset);

module.exports = router;

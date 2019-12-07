//these are the routes for everything related to a driver
const express = require("express");
const driverController = require("../controllers/driver.controllers");
const driverModel = require("../models/driver.model");
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const {
    protect,
    authorize
} = require('../middleware/auth');

router.post("/", protect, authorize('guard', 'FracAdmin', 'admin'), driverController.createDriver);
router.get("/", protect, authorize('guard', 'FracAdmin', 'admin'), advancedResults(driverModel), driverController.getDrivers);
router.get("/:driverId", authorize('guard', 'FracAdmin', 'admin'), protect, driverController.getDriverById);
router.delete("/:driverId", authorize('admin'), protect, driverController.deleteDriver);

module.exports = router;
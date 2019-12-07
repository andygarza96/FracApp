//these are the routes for everything related to a car
const express = require("express");
const carController = require("../controllers/car.controllers");
const carModel = require("../models/car/car.model");

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const {
    protect,
    authorize
} = require('../middleware/auth');

router.post("/", protect, authorize('guard', 'FracAdmin', 'admin'), carController.createCar);
router.get("/", protect, authorize('guard', 'FracAdmin', 'admin'), advancedResults(carModel), carController.getCars);
router.get("/:carId", protect, authorize('guard', 'FracAdmin', 'admin'), carController.getCarById);
router.put("/:carId", protect, authorize('guard', 'FracAdmin', 'admin'), carController.updateCar);
router.delete("/:carId", protect, authorize('admin'), carController.deleteCar);


module.exports = router;
//these are the routes for everything related to a car
const express = require("express");
const carController = require("../controllers/car.controllers");
const carModel = require("../models/car.model");

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const {
    protect,
    authorize
} = require('../middleware/auth');

router.post("/", /* protect, authorize('user'),*/ carController.createCar);
router.get("/", /*protect, authorize('user'),*/ advancedResults(carModel), carController.getCars);
router.get("/:carId", /* protect, authorize('user'),*/ carController.getCarById);
router.delete("/:carId", /* protect, authorize('user'),*/ carController.deleteCar);


module.exports = router;
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

router.post("/", carController.createCar);
router.get("/", advancedResults(carModel), carController.getCars);


module.exports = router;
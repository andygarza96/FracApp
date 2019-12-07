//these are the routes for everything related to a neighborhood
const express = require("express");
const neighborhoodController = require("../controllers/neighborhood.controllers");
const neighborhoodModel = require("../models/neighborhood/neighborhood.model");

//Include other resources routers
const courseRouter = require('./house.routes');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const {
    protect,
    authorize
} = require('../middleware/auth');

//Re-route into other resourses routers 
router.use('/:neighborhoodId/houses', courseRouter);

router.post("/", protect, authorize('admin'), neighborhoodController.createNeighborhood);
router.get("/", protect, authorize('admin'), advancedResults(neighborhoodModel, 'houses'), neighborhoodController.getNeighborhoods);
router.get("/:neighborhoodId", protect, authorize('admin'), neighborhoodController.getNeighborhoodById);
router.put("/:neighborhoodId", protect, authorize('admin'), neighborhoodController.updateNeighborhood);
router.delete("/:neighborhoodId", protect, authorize('admin'), neighborhoodController.deleteNeighborhood);
// TODO: frac admin agrega news
module.exports = router;
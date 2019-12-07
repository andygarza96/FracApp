//these are the routes for everything related to a house
const express = require("express");
const houseController = require("../controllers/house.controllers");
const houseModel = require("../models/house/house.model");
const router = express.Router({
    mergeParams: true
});
const advancedResults = require('../middleware/advancedResults');
const {
    protect,
    authorize
} = require('../middleware/auth');

router.post("/", protect, authorize('admin'), houseController.createHouse);
router.get("/", protect, authorize('FracAdmin', 'admin'), advancedResults(houseModel), houseController.getHouses);
router.get("/:houseId", authorize('FracAdmin', 'admin'), protect, houseController.getHouseById);
router.put("/:houseId", protect, authorize('FracAdmin', 'admin'), houseController.updateHouse);
router.delete("/:houseId", protect, authorize('admin'), houseController.deleteHouse);

module.exports = router;
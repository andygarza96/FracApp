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

router.post("/", protect, authorize('user'), houseController.createHouse);
router.get("/", protect, authorize('user'), advancedResults(houseModel), houseController.getHouses);
router.get("/:houseId", protect, authorize('user'), houseController.getHouseById);
router.put("/:houseId", protect, authorize('user'), houseController.updateHouse);
router.put("/:houseId", protect, authorize('user'), houseController.addResident);
router.put("/:houseId", protect, authorize('user'), houseController.addPayment);
router.delete("/:houseId", protect, authorize('user'), houseController.deleteHouse);

module.exports = router;
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

router.post("/", houseController.createHouse);
router.get("/", houseController.getHouses);
router.get("/:houseId", houseController.getHouseById);
router.put("/:houseId", houseController.updateHouse);
router.put("/:houseId/residents", houseController.addResident);
router.put("/:houseId/payments", houseController.addPayments);
router.delete("/:houseId", houseController.deleteHouse);

module.exports = router;
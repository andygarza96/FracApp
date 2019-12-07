//this is the controller for everything that a is related to a house
const HouseModel = require("../models/house/house.model");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Neighborhood = require('../models/neighborhood/neighborhood.model');

/*Creates one house and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createHouse = asyncHandler(async (req, res, next) => {
    const createdModel = await HouseModel.create(req.body);
    res.status(201).json(createdModel);
});
/*Gets all houses and catch if there is an error 
and sends a message with the error back*/
exports.getHouses = asyncHandler(async (req, res, next) => {
    if (req.params.neighborhoodId) {
        const allHouses = await HouseModel.find({
            neighborhood: req.params.neighborhoodId
        });
        return res
            .status(200)
            .json({
                success: true,
                count: allHouses.length,
                data: allHouses
            });
    } else {
        res.status(200).json(res.advancedResults);
    }
});


/*Gets one house by Id and catch if is a non existing Id 
  or if there is an error and sends a message with the error back*/
exports.getHouseById = asyncHandler(async (req, res, next) => {

    const houseModel = await HouseModel.findById(req.params.houseId);

    if (houseModel) {
        res.status(200).json(houseModel);
    } else {
        return next(new ErrorResponse(`House not found with id of ${req.params.houseId}`, 404));
    }
});


/*Updates one house by its Id, it handles error and non existing Ids
and sends a message with the error back.
With this controller we can also add the comments*/
exports.updateHouse = asyncHandler(async (req, res, next) => {
    let newtelephone = req.body.telephone;
    let newowner = req.body.owner;
    let newcelphone = req.body.celphone;
    let newstatus = req.body.status;
    let newinDebt = req.body.inDebt;
    const updatedHouse = await HouseModel.findByIdAndUpdate(
        req.params.houseId, {
            telephone: newtelephone,
            owner: newowner,
            celphone: newcelphone,
            status: newstatus,
            inDebt: newinDebt
        }
    );
    //TODO agregar pagos y residentes
    if (updatedHouse) {
        res.status(200).json(updatedHouse);
    } else {
        res.status(404).send();
    }

});
/*this is to delete a house by its Id, it handles errors,
 catch non existing Ids and sends a message with the error back*/
exports.deleteHouse = asyncHandler(async (req, res, next) => {
    const deletedHouse = await HouseModel.findByIdAndDelete(
        req.params.houseId
    );

    if (deletedHouse) {
        res.status(200).json(deletedHouse);
    } else {
        res.status(404).send();
    }

});
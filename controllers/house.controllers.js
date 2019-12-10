//this is the controller for everything that a is related to a house
const HouseModel = require("../models/house/house.model");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/*Creates one house and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createHouse = asyncHandler(async (req, res, next) => {
    console.log(req.body);

    const createdModel = await HouseModel.create(req.body);
    res.status(201).json(createdModel);
});


/*Gets all houses and catch if there is an error 
and sends a message with the error back*/
exports.getHouses = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json(res.advancedResults);
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
and sends a message with the error back.*/
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
    if (updatedHouse) {
        res.status(200).json(updatedHouse);
    } else {
        res.status(404).send();
    }

});
/*Adds a resident to its house*/
exports.addResident = asyncHandler(async (req, res, next) => {
    const houseModel = await HouseModel.findById(req.params.houseId);

    if (houseModel) {

        let newValue = req.body.residents;
        let newArray = houseModel.residents;

        console.log(typeof newValue);
        newArray.push(newValue);

        const updatedHouse = await HouseModel.findByIdAndUpdate(
            req.params.houseId, {

                residents: newArray
            }
        );
        if (updatedHouse) {
            res.status(200).json(updatedHouse);
        } else {
            res.status(404).send();
        }


    } else {
        return next(new ErrorResponse(`House not found with id of ${req.params.houseId}`, 404));
    }


});
/*Adds a Payment to its house*/
exports.addPayments = asyncHandler(async (req, res, next) => {
    const houseModel = await HouseModel.findById(req.params.houseId);

    if (houseModel) {

        let newValue = req.body.payments;
        let newArray = houseModel.payments;

        console.log(typeof newValue);
        newArray.push(newValue);

        const updatedHouse = await HouseModel.findByIdAndUpdate(
            req.params.houseId, {

                payments: newArray
            }
        );
        if (updatedHouse) {
            res.status(200).json(updatedHouse);
        } else {
            res.status(404).send();
        }


    } else {
        return next(new ErrorResponse(`House not found with id of ${req.params.houseId}`, 404));
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
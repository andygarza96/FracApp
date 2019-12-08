//this is the controller for everything that a is related to a car
const CarModel = require("../models/car.model");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/*Creates one car and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createCar = asyncHandler(async (req, res, next) => {
    const createdModel = await CarModel.create(req.body);
    res.status(201).json(createdModel);
});
/*Gets all cars and catch if there is an error 
and sends a message with the error back*/
exports.getCars = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json(res.advancedResults);
});

/*Gets one car by Id and catch if is a non existing Id 
  or if there is an error and sends a message with the error back*/
exports.getCarById = asyncHandler(async (req, res, next) => {

    const carModel = await CarModel.findById(req.params.carId);

    if (carModel) {
        res.status(200).json(carModel);
    } else {
        return next(new ErrorResponse(`Car not found with id of ${req.params.carId}`, 404));
    }
});

/*this is to delete a car by its Id, it handles errors,
 catch non existing Ids and sends a message with the error back*/
exports.deleteCar = asyncHandler(async (req, res, next) => {
    const deletedCar = await CarModel.findByIdAndDelete(
        req.params.carId
    );

    if (deletedCar) {
        res.status(200).json(deletedCar);
    } else {
        res.status(404).send();
    }

});
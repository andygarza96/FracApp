//this is the controller for everything that a is related to a driver
const DriverModel = require("../models/driver.model");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/*Creates one driver and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createDriver = asyncHandler(async (req, res, next) => {
    const createdModel = await DriverModel.create(req.body);
    res.status(201).json(createdModel);
});
/*Gets all drivers and catch if there is an error 
and sends a message with the error back*/
exports.getDrivers = asyncHandler(async (req, res, next) => {
    const allDrivers = await DriverModel.find({});
    res
        .status(200)
        .json(res.advancedResults);
});

/*Gets one driver by Id and catch if is a non existing Id 
  or if there is an error and sends a message with the error back*/
exports.getDriverById = asyncHandler(async (req, res, next) => {

    const driverModel = await DriverModel.findById(req.params.driverId);

    if (driverModel) {
        res.status(200).json(driverModel);
    } else {
        return next(new ErrorResponse(`Driver not found with id of ${req.params.driverId}`, 404));
    }
});


/*this is to delete a driver by its Id, it handles errors,
 catch non existing Ids and sends a message with the error back*/
exports.deleteDriver = asyncHandler(async (req, res, next) => {
    const deletedDriver = await DriverModel.findByIdAndDelete(
        req.params.driverId
    );

    if (deletedDriver) {
        res.status(200).json(deletedDriver);
    } else {
        res.status(404).send();
    }

});
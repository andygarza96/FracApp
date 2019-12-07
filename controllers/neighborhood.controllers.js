//this is the controller for everything that a is related to a neighborhood
const NeighborhoodModel = require("../models/neighborhood/neighborhood.model");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/*Creates one neighborhood and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createNeighborhood = asyncHandler(async (req, res, next) => {
    const createdModel = await NeighborhoodModel.create(req.body);
    res.status(201).json(createdModel);
});
/*Gets all neighborhoods and catch if there is an error 
and sends a message with the error back*/
exports.getNeighborhoods = asyncHandler(async (req, res, next) => {

    res
        .status(200)
        .json(res.advancedResults);
});

/*Gets one neighborhood by Id and catch if is a non existing Id 
  or if there is an error and sends a message with the error back*/
exports.getNeighborhoodById = asyncHandler(async (req, res, next) => {

    const neighborhoodModel = await NeighborhoodModel.findById(req.params.neighborhoodId);

    if (neighborhoodModel) {
        res.status(200).json(neighborhoodModel);
    } else {
        return next(new ErrorResponse(`Neighborhood not found with id of ${req.params.neighborhoodId}`, 404));
    }
});


/*Updates one neighborhood by its Id, it handles error and non existing Ids
and sends a message with the error back.
With this controller we can also add the comments*/
exports.updateNeighborhood = asyncHandler(async (req, res, next) => {
    let newdeleted = req.body.deleted;
    const updatedNeighborhood = await NeighborhoodModel.findByIdAndUpdate(
        req.params.neighborhoodId, {
            deleted: newdeleted
        }
        //TODO agregar News
    );
    if (updatedNeighborhood) {
        res.status(200).json(updatedNeighborhood);
    } else {
        res.status(404).send();
    }

});
/*this is to delete a neighborhood by its Id, it handles errors,
 catch non existing Ids and sends a message with the error back*/
exports.deleteNeighborhood = asyncHandler(async (req, res, next) => {
    const deletedNeighborhood = await NeighborhoodModel.findByIdAndDelete(
        req.params.neighborhoodId
    );

    if (deletedNeighborhood) {
        res.status(200).json(deletedNeighborhood);
    } else {
        res.status(404).send();
    }

});
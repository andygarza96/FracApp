//this is the controller for everything that a is related to a news
const NewsModel = require("../models/news.model");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/*Creates one news and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createNews = asyncHandler(async (req, res, next) => {
    const createdModel = await NewsModel.create(req.body);
    res.status(201).json(createdModel);
});
/*Gets all news and catch if there is an error 
and sends a message with the error back*/
exports.getNews = asyncHandler(async (req, res, next) => {

    res
        .status(200)
        .json(res.advancedResults);
});

/*Gets one news by Id and catch if is a non existing Id 
  or if there is an error and sends a message with the error back*/
exports.getNewsById = asyncHandler(async (req, res, next) => {

    const newsModel = await NewsModel.findById(req.params.newsId);

    if (newsModel) {
        res.status(200).json(newsModel);
    } else {
        return next(new ErrorResponse(`News not found with id of ${req.params.newsId}`, 404));
    }
});


/*Updates one news by its Id, it handles error and non existing Ids
and sends a message with the error back.
With this controller we can also add the comments*/
exports.updateNews = asyncHandler(async (req, res, next) => {
    let newdeleted = req.body.deleted;
    const updatedNews = await NewsModel.findByIdAndUpdate(
        req.params.newsId, {
            deleted: newdeleted
        }
        //TODO agregar News
    );
    if (updatedNews) {
        res.status(200).json(updatedNews);
    } else {
        res.status(404).send();
    }

});
/*this is to delete a news by its Id, it handles errors,
 catch non existing Ids and sends a message with the error back*/
exports.deleteNews = asyncHandler(async (req, res, next) => {
    const deletedNews = await NewsModel.findByIdAndDelete(
        req.params.newsId
    );

    if (deletedNews) {
        res.status(200).json(deletedNews);
    } else {
        res.status(404).send();
    }

});
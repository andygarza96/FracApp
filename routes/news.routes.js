//these are the routes for everything related to a news
const express = require("express");
const newsController = require("../controllers/news.controllers");
const newsModel = require("../models/news.model");


const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const {
    protect,
    authorize
} = require('../middleware/auth');



router.post("/", newsController.createNews);
router.get("/:newsId", newsController.getNewsById);
router.get("/", advancedResults(newsModel), newsController.getNews);
router.put("/:newsId", newsController.updateNews);
router.delete("/:newsId" /*, protect, authorize('user')*/ , newsController.deleteNews);
module.exports = router;
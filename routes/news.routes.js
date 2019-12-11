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
router.get("/", advancedResults(newsModel), newsController.getNews);

module.exports = router;
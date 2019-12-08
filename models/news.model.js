const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is mandatory"],
        maxlength: [50, "Title can not be more than 50 characters"]
    },
    description: {
        type: String,
        required: true,
        maxlength: [150, "Description can not be more than 150 characters"]
    },
    details: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
        required: true

    },
    deleted: {
        type: Boolean,
        required: true,
        defaulte: false
    }
});

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;
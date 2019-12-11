const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    house: {
        type: Number,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        required: true

    },
    timeOfEntry: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const CarModel = mongoose.model("Cars", CarSchema);


module.exports = CarModel;
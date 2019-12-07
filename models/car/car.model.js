const mongoose = require("mongoose");
const EntryLogSchema = require('./entryLogs.model');

const CarSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
        unique: true
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
    entries: {
        type: [EntryLogSchema],
        required: [true, "Please enter driver and house"]
    }
});

const CarModel = mongoose.model("Cars", CarSchema);
//TODO al registrar un auto si no tiene entrada te lo registra vacio y no deberia tambien lo crea aun que el conductor o la casa no exista


module.exports = CarModel;
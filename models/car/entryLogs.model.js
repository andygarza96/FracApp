const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const EntryLogsSchema = new mongoose.Schema({
    driver: {
        type: ObjectId,
        ref: 'Drivers',
        required: true
    },
    house: {
        type: ObjectId,
        ref: 'Houses',
        required: true

    },
    timeOfEntry: {
        //TODO timestamp para la hora y dia de entrada esta mal declara creo
        type: Date,
        required: true,
        default: Date.now,
    },

});

module.exports = EntryLogsSchema;
const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    FLastName: {
        type: String,
        required: true
    },
    MLastName: {
        type: String,
        required: false

    },
    IdType: {
        type: String,
        required: true,
        enum: [
            'INE',
            'LICENCIA',
            'OTRO'
        ]
    },
    IdNumber: {
        type: String,
        required: true
    }
});

const DriverModel = mongoose.model("Drivers", DriverSchema);

module.exports = DriverModel;
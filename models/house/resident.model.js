const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    MiddleName: {
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
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: false,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },

    celphone: {
        type: Number
    },
    sex: {
        type: String,
        enum: ['F', 'M'],
        required: true
    }

});

module.exports = ResidentSchema;
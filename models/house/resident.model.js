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
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
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
    },
    delete: {
        type: Boolean,
        required: true,
        default: false

    }

});

module.exports = ResidentSchema;
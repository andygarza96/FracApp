const mongoose = require("mongoose");

const PaymentLogsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true

    },
    timeOfPayment: {
        //TODO timestamp para la hora y dia de pago
        type: Date,
        default: Date.now,

    },

});

module.exports = PaymentLogsSchema;
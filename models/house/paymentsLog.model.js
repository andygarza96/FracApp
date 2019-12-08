const mongoose = require("mongoose");

const PaymentLogsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    reason: {
        type: String,
        required: true,
        default: "no hay pago"
    },
    timeOfPayment: {
        //TODO timestamp para la hora y dia de pago
        type: Date,
        default: Date.now

    }
});

module.exports = PaymentLogsSchema;
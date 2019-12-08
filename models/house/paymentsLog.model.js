const mongoose = require("mongoose");

const PaymentLogsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

module.exports = PaymentLogsSchema;
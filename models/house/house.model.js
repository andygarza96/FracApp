const mongoose = require("mongoose");
const PaymentLogSchema = require("./paymentsLog.model");
const ResidentSchema = require("./resident.model");
var ObjectId = mongoose.Schema.Types.ObjectId;

const HouseSchema = new mongoose.Schema({
    houseNumber: {
        type: Number,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        required: true,
        unique: true
    },
    street: {
        type: String,
        required: true
    },
    telephone: {
        type: Number
    },
    status: {
        type: String,
        enum: ["Rentada", "En Venta", "En Renta", "Habitada", "Deshabitada"],
        required: true
    },
    inDebt: {
        type: Boolean,
        required: true,
        default: false
    },
    residents: {
        type: [ResidentSchema],
        required: true
    },
    payments: {
        type: [PaymentLogSchema],
        required: true
    }
});

const HouseModel = mongoose.model("Houses", HouseSchema);

module.exports = HouseModel;
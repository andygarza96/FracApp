const mongoose = require("mongoose");
const PaymentLogSchema = require("./paymentsLog.model");
const ResidentSchema = require("./resident.model");
var ObjectId = mongoose.Schema.Types.ObjectId;

const HouseSchema = new mongoose.Schema({
    neighborhood: {
        type: ObjectId,
        ref: "Neighborhood",
        required: true
    },
    houseNumber: {
        type: String,
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
    owner: {
        type: String,
        required: true
    },
    celphone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Rented", "On Sale", "Inhabited", "uninhabited", "On Rent"],
        required: true
    },
    inDebt: {
        type: Boolean,
        required: true,
        default: false
    },
    residents: {
        type: [ResidentSchema]
    },
    payments: {
        type: [PaymentLogSchema]
    }
});

const HouseModel = mongoose.model("Houses", HouseSchema);

module.exports = HouseModel;
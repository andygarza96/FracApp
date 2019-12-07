const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/FracApp", {
                useNewUrlParser: true
            }
        );
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = {
    connect
};
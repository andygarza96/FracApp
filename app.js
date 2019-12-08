//const path = require('path');
const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const colors = require("colors");

const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
// const hpp = require('hpp');
// const cors = require('cors');
const errorHandler = require("./middleware/error");

//Route Files
const carRoutes = require("./routes/car.routes");
const newsRoutes = require("./routes/news.routes");
const houseRoutes = require("./routes/house.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");

// Load env vars
dotenv.config({
    path: './config/config.env'
});

const app = express();

//Connect to de DB
const mongodb = require("./config/mongodb/mongodb.connect");
mongodb.connect();

//body parser
app.use(express.json());

//Routes
app.use("/cars", carRoutes);
app.use("/newss", newsRoutes);
app.use("/houses", houseRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);


app.use(errorHandler);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {

});

module.exports = app;
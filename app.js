const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");

const cookieParser = require('cookie-parser');
const cors = require('cors');
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

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



// Enable CORS
app.use(cors());


app.use(errorHandler);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    //     console.log(`Error: ${err.message}`.red);
    //     // Close server & exit process
    //     // server.close(() => process.exit(1));
});

//Routes
app.use("/cars", carRoutes);
app.use("/news", newsRoutes);
app.use("/houses", houseRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);


module.exports = app;
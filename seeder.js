const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Load models
const House = require('./models/house/house.model');
const News = require('./models/news.model');
const User = require('./models/User.model');
const Car = require('./models/car.model');


mongoose.connect("mongodb://localhost:27017/FracApp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const houses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/houses.json`, 'utf-8')
);

const news = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/news.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cars.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await House.create(houses);
    await News.create(news);
    await User.create(users);
    await Car.create(cars);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await House.deleteMany();
    await News.deleteMany();
    await User.deleteMany();
    await Car.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
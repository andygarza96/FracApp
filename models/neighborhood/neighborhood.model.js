const mongoose = require("mongoose");
const NewsSchema = require("./news.model");

const NeighborhoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    maxlength: [60, "Please enter a valid city"],
    required: [true, "Please enter a city"]
  },
  state: {
    type: String,
    required: [true, "Please enter a state"]
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter a zip code"]
  },
  news: {
    type: [NewsSchema],
    required: true,
    default: {
      title: "No news to show",
      description: "A soon as we get some new we will update this page",
      deleted: "false"
    }
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

//Reverse Populate with Virtuals
NeighborhoodSchema.virtual('houses', {
  ref: 'Houses',
  localField: '_id',
  foreignField: 'neighborhood',
  justOne: false
});


const NeighborhoodModel = mongoose.model("Neighborhoods", NeighborhoodSchema);

module.exports = NeighborhoodModel;
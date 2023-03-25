const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(uri) {
  try {
    mongoose.connect(uri);
    mongoose.set('strictQuery', true);
    console.log("connected to MongoDB!");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;
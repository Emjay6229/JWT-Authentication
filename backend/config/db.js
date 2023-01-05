const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_DB_LOCAL } = process.env;

async function connectDB(uri=MONGO_DB_LOCAL) {
  try {
    mongoose.connect(uri);
    mongoose.set('strictQuery', true);
    console.log("connected to MongoDB!");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;
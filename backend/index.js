require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const { PORT } = process.env || 3000;
const { HOST } = process.env;
const { MONGO_DB_LOCAL } = process.env;
const cookieParser = require("cookie-parser");

const app = express();

// Require routes
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

// mount middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// mount routes
app.use("/", authRoute);
app.use("/users", userRoute);

const start = () => {
  try {
    // connect to database
    connect( MONGO_DB_LOCAL );

    app.listen(PORT, HOST, () => {
      console.log(`server is running on port ${PORT}!`);
    });
  } catch (err) {
      console.log("Unable to connect to server")
  }
}

start();


const express = require("express");
const connect = require("./backend/config/db");
require("dotenv").config();
const { PORT } = process.env || 5000;
const { HOST } = process.env;
const cookieParser = require("cookie-parser");


const app = express();

connect();

// Require routes
const router = require("./backend/routes/authRoute");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(router);
app.use(express.static("./Frontend"));

// ****SERVER*****
app.listen(PORT, HOST, () => {
  console.log(`server is running on port ${PORT}!`);
});

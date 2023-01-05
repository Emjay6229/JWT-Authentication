const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.redirect("/login");
  } 
  else {
      jwt.verify(token, SECRET , (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        }
        console.log(decodedToken);
        next();
      })
    } 
  }

module.exports = { verifyToken };


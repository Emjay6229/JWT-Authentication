const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.redirect("/login");
  } 
  else {
      jwt.verify(token, SECRET , (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        }
         next();
      })
    } 
  }

module.exports = { verifyToken };
        


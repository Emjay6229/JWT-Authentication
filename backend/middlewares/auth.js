require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

// Check for presence of authentication token
const verifyToken = (req, res, next) => {

  // extract token from cookie
  const token = req.cookies.jwt;
  // check if token exists.
  if (!token) {
     // return error if token does not exist 
      res.status(401).json({
          msg: "No token found"
        });
      console.log("No token found")
  } else {
    // else verify token. If no error, call next() function
      jwt.verify(token, SECRET , (err, decoded) => {
        if (err) {
          console.log(err.message);
        }
        console.log(decoded);
        next();
      })
    } 
  }

module.exports = { verifyToken };
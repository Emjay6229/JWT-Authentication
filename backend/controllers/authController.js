// IMPORT MODULES
require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const expiryTime = 1800;
const errors = require("./errorController");

// jwt creation function
const createToken = (id, email) => {
  // Payload contains information to be sent in the token
  let payload = {id, email};
  return jwt.sign(payload, SECRET, { expiresIn: expiryTime });
}

// REGISTRATION AUTHENTICATION
exports.registerNewUser = async (req, res) => {
  try {  
          // Get user's name, email and password details from request body
          const { name, email, password } =  req.body;

          // mongoose pre-save hook executes here, hashes user password.

          const newUser = await User.create({ name, email, password }); 
          // creates a new user in the database

          const token = createToken(newUser._id, newUser.email);  
          // creates a verification token from user email and id.

          res.cookie("jwt", token, { httpOnly: true, maxAge: expiryTime * 1000 }); 
          // stores token in cookie

          console.log("Your Registration was successful!");

          res.status(200).json({ 
            id: newUser._id, 
            name: newUser.name, 
            email: newUser.email
          });

          } catch (err) {
                const error = errors.errorHandler(err);
                res.status(400).json({error});
            }
          }

// LOGIN AUTHENTICATION 
  exports.loginUser = async (req, res) => {
      try {
              const { email, password } =  req.body; 
              // Get user input from request body to execute logic on body data.

              const user = await User.login(email, password); 
              // model.login() returns matching user based on email parameter from database

              const token = createToken(user._id, user.email);  
              // create token to be attached to response

              res.cookie("jwt", token, { httpOnly: true, maxAge: expiryTime * 1000 }); 
              // stores authentication token in cookie which is sent to the client in the browser.
              
              console.log("login successful!");

              res.status(200).json({
                id: user._id, 
                name: user.name, 
                email: user.email 
              });

        } catch (err) {
              const error = errors.errorHandler(err);
              res.status(400).json({ error});
          }
        }

// LOG USER OUT
exports.logOut = async (req, res) => {
  try {
         res.cookie("jwt", "", { httpOnly: true, maxAge: 1 })

         res.status(200).json ({ Success: "You have been succesfully Logged out" })
    } catch(err) {
          console.log(err.message);
      }
    }
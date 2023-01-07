// IMPORT MODULES
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;
const expiryTime = 1800;
const errors = require("./errorController");
const { verifyToken } = require("../middlewares/auth.js");

// jwt creation function
const createToken = (id, email) => {
  let payload = {id, email};
  return jwt.sign(payload, SECRET, { expiresIn: expiryTime });
}

// REGISTRATION AUTHENTICATION
exports.registerNewUser = async (req, res) => {
  try {  
          const { name, email, password } =  req.body; // Get user details from request body
          // mongoose pre-save hook executes here, hashes password.
          const newUser = await User.create({ name, email, password }); // create new user
          const token = createToken(newUser._id, newUser.email);  // create token
          res.cookie("jwt", token, { httpOnly: true, maxAge: expiryTime * 1000 }); // stores token in cookie
          console.log("Your Registration was successful!" , {newUser: newUser._id});

          // render welcome page
          verifyToken; 
          res.redirect("/welcome");

          } catch (err) {
                const error = errors.errorHandler(err);
                res.status(400).json({ error});
            }
          }

// LOGIN AUTHENTICATION 
  exports.loginUser = async (req, res) => {
      try {
              const { email, password } =  req.body; // Get user input from request body
              const user = await User.login(email, password); // login user using mongoose statics
              const token = createToken(user._id, user.email);  // create token
              res.cookie("jwt", token, { httpOnly: true, maxAge: expiryTime * 1000 }); // stores token in cookie
              console.log("login successful!" , {user });

              verifyToken;
              res.redirect("/welcome");

        } catch (err) {
              const error = errors.errorHandler(err);
              res.status(400).json({ error});
          }
        }

    
// GET A SINGLE USER
  exports.getSingleUser = async (req, res) => {
      try {
              const id = {_id: req.params.id };

              const singleUser = await User.findOne(id);

              res.status(200).json(singleUser);
       } catch (err) {
            console.log(err.message);
       }
    } 


// UPDATE USER DETAILS
  exports.updateUser = async (req, res) => {
      try {
              const id = { _id: req.params.id };

              const updatedUser = req.body;
              
              await User.findOneAndUpdate(id, updatedUser, { new: true });

              res.status(200).send("User updated");
              console.log(updatedUser);

      } catch (err) {
              console.log(err.message);
          }
        }


// DELETE USER
  exports.deleteUser = async (req, res) => {
      try {
              const id = { _id: req.params.id };
              
              await User.findOneAndDelete(id);

              res.status(200).send("User deleted");
        } catch(err) {
              console.log(err.message);
          }
        }
  
  
  exports.logOut = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
    console.log("You have been logged out successfully.")
  }

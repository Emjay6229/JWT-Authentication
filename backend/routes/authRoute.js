const router = require("express").Router();
const {
  registerNewUser,
  loginUser,
  logOut
} = require("../controllers/authController.js");

//Set up routes for registration, Login, Log out
router
  .post("/signup", registerNewUser)
  .post("/signin", loginUser)
  .post("/signout", logOut)
  
module.exports = router;
  



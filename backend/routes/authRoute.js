const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.js");
const authController = require("../controllers/authController.js");
const pageController = require("../controllers/pageController.js");

//Set up routes for registration and Login 
router
  .get("/", pageController.getLandingPage)
  .get("/signup", pageController.getSignUpPage)
  .get("/login", pageController.getLoginPage)
  .post("/signup", authController.registerNewUser)
  .post("/login", authController.loginUser)
  .get("/welcome", verifyToken, pageController.getWelcomePage)
  .get("/welcome/logout", verifyToken, authController.logOut)
  .get("/welcome/library", verifyToken, pageController.getLibraryPage)
  .get("/welcome/:_id", authController.getSingleUser)
  .put("/welcome/:_id", verifyToken, authController.updateUser)
  .delete("/welcome/:_id", verifyToken, authController.deleteUser)
  
module.exports = router;
  



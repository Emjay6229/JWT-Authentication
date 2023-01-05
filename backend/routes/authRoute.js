const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.js");
const authController = require("../controllers/authController.js");
const pageController = require("../controllers/pageController.js");
const uploadController = require("../controllers/uploadController")
// const chunkController = require("../controllers/chunkController.js");

//Set up routes for registration and Login 
router
  .get("/", pageController.getLandingPage)
  .get("/signup", pageController.getSignUpPage)
  .get("/login", pageController.getLoginPage)
  .get("/signup/:id", authController.getSingleUser)
  .get("/welcome", verifyToken, pageController.getWelcomePage)
  .get("/library", verifyToken, pageController.getLibraryPage)
  .post("/signup", authController.registerNewUser)
  .post("/login", authController.loginUser)
  .put("/signup/:id", authController.updateUser)
  .delete("/signup/:id", authController.deleteUser)
  // .post('/uploads', upload.single('file'), uploadController.uploadFile)
    
module.exports = router;
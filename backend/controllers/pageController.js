const path = require("path");

const landingPage = path.join(__dirname, "../../Frontend/static/index.html");
const signupPage = path.join(__dirname, "../../Frontend/static/sign-up.html");
const loginPage = path.join(__dirname, "../../Frontend/static/login.html");
const libraryPage = path.join(__dirname, "../../Frontend/static/library.html");
const welcomePage = path.join(__dirname, "../../Frontend/static/welcome.html");

// landing page
exports.getLandingPage = (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(landingPage)
};

// Sign-up
exports.getSignUpPage = (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(signupPage);
};

// Log in
exports.getLoginPage = (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(loginPage);
};

// Library Page
exports.getLibraryPage = (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(libraryPage);
};

// welcome Page
exports.getWelcomePage = (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(welcomePage);
};
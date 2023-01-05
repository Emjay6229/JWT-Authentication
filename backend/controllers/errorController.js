// @Handle errors
// @desc  handles all errors such as user validation, duplicate errors.

exports.errorHandler = (err) => {
    console.log(err.message, err.code);
    
    let errors = { name: "", email: "", password: "" }
  
    // Duplicate error code
    if (err.code === 11000) {
      errors.email = "User exists, Please Login."
      return errors;
    }

    // Incorrect email error
    if (err.message === "Incorrect email") {
        errors.email = "Please enter a correct email address"
      }

      // Incorrect password error
      if (err.message === "Incorrect password") {
          errors.email = "Please enter a correct password"
        }
    
    // Validation errors
    if (err.message.includes("User validation failed")) {
          let validationError = Object.values(err.errors); // returns an array containing error fields objects
          let getErrorMessage = ({ properties }) => { errors[properties.path] = properties.message; }
          validationError.forEach(getErrorMessage);
        }
    return errors;
  }
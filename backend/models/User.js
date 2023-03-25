const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// Create mongoose schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter your full name"]
    },

    email: {
      type: String,
      required:  [true, "Please enter your email address"],
      unique: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email address."],
      lowerCase: true,
    },
    
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Minimum password length is 6 characters"]
    },
  },
  { timestamps: true }
);

// Use a mongoose pre-hook to hash user password before saving
  userSchema.pre("save", async function( next ) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);  
    // the "this" keyword here references the user object to be created from the userSchema
    next();
  });

// Use a mongoose post-hook to display created user to the console 
  userSchema.post("save", function( newUser, next ){
    console.log("Account Created successfully!")
    next();
  });

// create statics login method
  userSchema.statics.login = async function( email, password ) {
    const user = await this.findOne({ email });
    // finds and returns the "user object" from the database if it exists

      if (!user) {
        throw Error("Incorrect email");
      } 
    
    const verifyPassword = await bcrypt.compare( password, user.password );
    /* bcrypt.compare() takes two arguments: 
        a.) user's submitted login password 
        b.) user's hashed password as stored in the database 
    */
    if (!verifyPassword) {
            throw Error("Incorrect password");
          }

      return user;
  }

module.exports = mongoose.model("User", userSchema);

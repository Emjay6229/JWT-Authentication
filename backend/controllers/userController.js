const User = require("../models/User");

// GET A SINGLE USER
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})

    //map through the user objects array, extract and return only the desired properties in an array
    const userdata = users.map( user => {
        const {_id, name, email} = user;
        return {
          id: _id,
          name,
          email
        }
    })
    res.status(200).json(userdata);
  } catch (err) {
    res.status(200).json(err.message)
    console.log(err.message);
  }
}

exports.getSingleUser = async (req, res) => {
    try {
      const email = { email: req.params.email}
      // email = {email: user email}
    
      if ( email ) {
          const singleUser = await User.findOne( email ) ;

          if(singleUser !== null) {
            const { _id, name, email } = singleUser;

            res.status(200).json({
            id: _id,
            name,
            email
          })
      } else {
          res.status(400).json({
            message: "No matching user found"
          })
        }
      }   
    }
   catch (err) {
        res.status(200).json(err.message)
        console.log(err.message);
      }
    } 


// UPDATE USER DETAILS
exports.updateUser = async (req, res) => {
    try {
      const email = { email: req.params.email}

      if ( email ) {
          const user = await User.findOneAndUpdate(email, req.body, { new: true })

      if(user !== null) {
        const {_id, name, email} = user;

        res.status(200).json({ 
          message: "User updated", 
          id: _id,
          name, 
          email
        })
      } else {
        res.status(400).json({
          message: "No matching user found"
        })
      }
    }
  } catch (err) {
          res.status(200).json(err.message)
          console.log(err.message);
        }
      }


// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
          const { email } = req.query;
            await User.findOneAndDelete(email);
            res.status(200).json({ message: "User deleted" });
      } catch(err) {
            res.status(200).json(err.message)
            console.log(err.message);
        }
      }
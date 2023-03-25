const router = require("express").Router();
const {
    getAllUsers,
    getSingleUser, 
    updateUser, 
    deleteUser
} = require("../controllers/userController.js");

router.route("/")
    .get(getAllUsers)
    .delete(deleteUser)
router.route("/:email")
    .get(getSingleUser)
    .patch(updateUser)
  
module.exports = router;
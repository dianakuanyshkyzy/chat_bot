const express = require("express"); 
const {registerUser, getUsers} = require("../controllers/userController")
const {loginUser} = require("../controllers/userController")
const {findUser} = require("../controllers/userController")
const router = express.Router(); 

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/find/:userId", findUser)
router.get("/", getUsers)


module.exports = router; 

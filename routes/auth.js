const router = require("express").Router()
const UserController = require("../controller/userController")

//post request for Sign Up
router.post("/signup", UserController.newSignup)

//LOGIN
router.post("/login", UserController.newLogin)

module.exports = router

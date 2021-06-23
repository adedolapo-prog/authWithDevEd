const router = require("express").Router()
const UserController = require("../controller/userController")
const verify = require("../validation/verifyToken")

router.get("/", verify, UserController.getPosts)

module.exports = router

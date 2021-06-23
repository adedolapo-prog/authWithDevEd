const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/userModel")
const {
  signupValidation,
  loginValidation,
} = require("../validation/validationModel")

//post request for Sign Up
router.post("/signup", async (req, res) => {
  try {
    //validate data
    await signupValidation(req.body)
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })

    const newUser = await user.save()
    return res.status(200).json({
      success: true,
      data: { userID: newUser._id, email: newUser.email },
    })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
})

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //validate login
    await loginValidation(req.body)

    //checking for the user email
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Email (or Password)" })
    }

    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid (Email or) Password" })
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    res
      .status(200)
      .header("auth-token", token)
      .json({
        loginSuccess: true,
        data: { userID: user._id, email: user.email },
      })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
})

module.exports = router

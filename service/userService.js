const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/userModel")
const {
  signupValidation,
  loginValidation,
} = require("../validation/validationModel")

module.exports = class userService {
  static async newLogin(object) {
    //validate login
    await loginValidation(object)

    //destructuting the object
    const { email, password } = object
    //find user
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error("Invalid Email (or Password)")
    }

    //Password check
    const validPass = await bcrypt.compare(password, user.password)

    if (!validPass) {
      throw new Error("Invalid (Email or) Password")
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    return { token, user }
  }

  static async newSignup(object) {
    //validate data
    await signupValidation(object)

    const { firstName, lastName, email, password } = object
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    })

    const newUser = await user.save()

    return user
  }
}

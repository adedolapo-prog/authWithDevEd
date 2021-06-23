const router = require("express").Router()
const User = require("../models/userModel")
const schema = require("../validation/validationModel")

//post request for Sign Up
router.post("/signup", async (req, res) => {
  try {
    //validate data
    const value = await schema.validateAsync(req.body)

    if (value) {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      })

      const newUser = await user.save()
      return res.status(200).json({ success: true, data: newUser })
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
})

router.post("/login", (req, res) => {
  res.send("LOGIN")
})

module.exports = router

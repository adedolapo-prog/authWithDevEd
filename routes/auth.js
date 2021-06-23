const router = require("express").Router()
const User = require("../models/userModel")

//validation
const Joi = require("joi")

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})

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

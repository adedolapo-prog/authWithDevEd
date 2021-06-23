//validation
const Joi = require("joi")

//signup validation
const signupValidation = async object => {
  const schema = Joi.object().keys({
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

  let value = schema.validate(object)
  if (value.error) {
    let error = value.error.details[0].message
    // console.log(error)
    if (error.includes("password")) {
      throw new Error(
        "password should be alphanumeric and should be atleast 6 characters"
      )
    } else {
      throw value.error
    }
  } else {
    return value
  }
}

module.exports = signupValidation

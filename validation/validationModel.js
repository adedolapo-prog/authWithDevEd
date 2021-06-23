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

module.exports = schema
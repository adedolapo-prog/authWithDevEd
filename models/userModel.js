const mongoose = require("mongoose")
mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre("save", async function (next) {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

const User = mongoose.model("user", userSchema)
module.exports = User

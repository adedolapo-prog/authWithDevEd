const mongoose = require("mongoose")
require("dotenv").config()
const { MONGO_URI } = process.env

//connect DB
const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Awesome, connected to db")
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB

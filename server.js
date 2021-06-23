const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const router = require("./routes/auth")
const connectDB = require("./dbConnect")

//connect db
connectDB()

//parsing data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//import route
app.use("/api/user", router)

//connect database

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})

const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")
const connectDB = require("./dbConnect")

//connect db
connectDB()

//parsing data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//import route
app.use("/api/user", authRouter)
app.use("/api/posts", postRouter)

//connect database

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})

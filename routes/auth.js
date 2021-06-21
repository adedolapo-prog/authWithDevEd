const router = require("express").Router()

//post request for Sign Up
router.post("/signup", (req, res) => {
  res.send("REGISTER")
})

router.post('/login', (req, res) => {
    res.send('LOGIN')
})

module.exports = router

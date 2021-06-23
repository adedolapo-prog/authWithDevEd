const router = require("express").Router()
const verify = require("../validation/verifyToken")

router.get("/", verify, (req, res) => {
  res.json({ post: { title: "my first post", description: "random data" } })
})

module.exports = router

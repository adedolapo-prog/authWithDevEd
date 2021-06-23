const UserService = require("../service/userService")

module.exports = class UserController {
  static async newLogin(req, res) {
    try {
      const { token, user } = await UserService.newLogin(req.body)
      res
        .status(200)
        .header("auth-token", token)
        .json({
          loginSuccess: true,
          data: { userID: user._id, email: user.email },
        })
    } catch (err) {
      res.status(400).json({ success: false, error: err.message })
    }
  }

  static async newSignup(req, res) {
    try {
      const newUser = await UserService.newSignup(req.body)

      return res.status(200).json({
        success: true,
        data: { userID: newUser._id, email: newUser.email },
      })
    } catch (err) {
      res.status(400).json({ success: false, error: err.message })
    }
  }

  static async getPosts(req, res) {
    res.json({ post: { title: "my first post", description: "random data" } })
  }
}

export class UserController {
  constructor(userService) {
    this.userService = userService
    this.getUser = this.getUser.bind(this)
    this.getAllUser = this.getAllUser.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.authUser = this.authUser.bind(this)
  }

  async getUser(req, res) {
    try {
      let user = await this.userService.getUserByUsername(req.user)
      res.status(200).json({ user })
    } catch {
      res.status(500).send()
    }
  }

  async getAllUser(req, res) {
    try {
      let results = await this.userService.getAllUser()
      res.status(200).json(results)
    } catch (e) {
      res.status(500)
    }
  }

  async register(req, res) {
    let { username, password } = req.body
    try {
      const result = await this.userService.registerNewUser({ username, password })
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async login(req, res) {
    const { username, password } = req.body
    try {
      const result = await this.userService.loginUser({ username, password })
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async authUser(req, res) {
    const { username: currentUsername } = req.user
    try {
      const user = await this.userService.getDataForAuth(currentUsername)
      res.status(200).json(user)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

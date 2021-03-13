export class UserController {
  constructor(userRepo, userService) {
    this.userRepo = userRepo
    this.userService = userService
    this.getAllUser = this.getAllUser.bind(this)
  }
  async getAllUser(req, res) {
    try {
      let results = await this.userService.getAllUser()
      res.status(200).json(results)
    } catch (e) {
      res.status(500)
    }
  }
}
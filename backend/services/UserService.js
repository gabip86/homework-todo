export class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo
    this.getAllUser = this.getAllUser.bind(this)
  }

  async getAllUser() {
    return this.userRepo.getAllUser()
  }
}

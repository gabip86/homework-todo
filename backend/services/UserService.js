import bcrypt from 'bcrypt'

export class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo
    this.hashPassword = this.hashPassword.bind(this)
    this.addNewUser = this.addNewUser.bind(this)
    this.userExists = this.userExists.bind(this)
    this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
    this.getDataForAuth = this.getDataForAuth.bind(this)
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async decodePassword(password, inputHashedPassword) {
    return bcryptjs.compare(password, inputHashedPassword);
  }

  async addNewUser(inputs) {
    return this.userRepo.addNewUser(inputs)
  }

  async getUserByUsername(username) {
    try {
      return this.userRepo.getUserByUsername(username)
    } catch (e) {
      throw Error('Cannot find this user.')
    }
  }

  async userExists(username) {
    const exists = this.userRepo.userExists(username)
    if (exists) {
      throw Error('User is already taken.')
    }
    return exists
  }

  async getDataForAuth(username) {
    return this.userRepo.getUserByUsername(username)
  }

  async getUserIdByUsername(username) {
    return this.userRepo.getUserIdByUsername(username)
  }
}

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { validateRegisterByInputs, validateLoginByInputs } from '../services/ValidatorService.js'

export class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo
    this.hashPassword = this.hashPassword.bind(this)
    this.registerNewUser = this.registerNewUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
    this.getDataForAuth = this.getDataForAuth.bind(this)
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async decodePassword(password, inputHashedPassword) {
    return bcrypt.compare(password, inputHashedPassword);
  }

  async registerNewUser({ username, password }) {
    validateRegisterByInputs({ username, password })
    const exists = await this.userRepo.userExists(username)
    if (exists) {
      throw Error('User is already taken.')
    } else {
      const hashedPassword = await this.hashPassword(password)
      return this.userRepo.addNewUser({ username, hashedPassword })
    }
  }

  async loginUser({ username, password }) {
    validateLoginByInputs({ username, password })
    const user = await this.getUserByUsername(username)
    const id = user.id
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ username: username }, config.secret, { expiresIn: '1h' })
      return { username, id, accessToken }
    } else {
      return { message: 'Password is incorrect' }
    }
  }

  async getUserByUsername(username) {
    try {
      return this.userRepo.getUserByUsername(username)
    } catch (e) {
      throw Error('Cannot find this user.')
    }
  }

  async getDataForAuth(username) {
    return this.userRepo.getUserByUsername(username)
  }

  async getUserIdByUsername(username) {
    return this.userRepo.getUserIdByUsername(username)
  }
}

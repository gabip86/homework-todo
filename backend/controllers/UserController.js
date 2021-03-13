import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export class UserController {
  constructor(userService) {
    this.userService = userService
    this.getUser = this.getUser.bind(this)
    this.getAllUser = this.getAllUser.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  async getUser(req, res) {
    console.log(req)
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array()[0].msg })
    } else {
      const hashedPassword = await this.userService.hashPassword(password)
      try {
        const result = await this.userService.addNewUser({ username, hashedPassword })
        res.status(200).json(result)
      } catch {
        res.status(500).send()
      }
    }
  }

  async login(req, res) {
    const { username, password } = req.body
    const user = await this.userService.getUserByUsername(username)
    if (!user) {
      return res.status(400).send({ message: 'Cannot find this user' })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({ username: username }, config.secret, { expiresIn: '1h' })
        res.json({ accessToken: accessToken })
      } else {
        res.send({ message: 'Password is incorrect' })
      }
    } catch {
      res.status(500).send()
    }
  }
}
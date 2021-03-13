import express from 'express'
import { body, validationResult, check } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { mysqlConnection } from '../db/index.js'
import authenticateToken from '../middleware/auth.js'
import config from '../config.js'
import { userController } from '../dependencies/dependencyInjections.js'

const router = express.Router()

router.get('/users', authenticateToken, userController.getAllUser)

router.get('/users/:id', authenticateToken, async (req, res) => {
  try {
    let results = await db.getUserById(req.params.id)
    res.json(results)
  } catch (e) {
    res.status(500)
  }
})

router.post('/register',
  body('username').notEmpty().withMessage('Username is required.'),
  check('username').custom(async value => {
    const user = await db.getUserByUsername(value)
    if (user) {
      return Promise.reject('Username already exists.')
    }
  }),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 character.'),

  async (req, res) => {
    let { username, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array()[0].msg })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      try {
        const result = await db.addNewUser({ username, hashedPassword })
        res.status(200).json(result)
      } catch {
        res.status(500).send()
      }
    }
  })

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await db.getUserByUsername(username)
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
})

router.get('/todos', authenticateToken, async (req, res) => {
  try {
    let results = await db.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    res.status(500)
  }
})

export { router }

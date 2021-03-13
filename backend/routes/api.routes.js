import express from 'express'
import { body, check } from 'express-validator'
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
    let results = await mysqlConnection.getUserById(req.params.id)
    res.json(results)
  } catch (e) {
    res.status(500)
  }
})

router.post('/register',
  body('username').notEmpty().withMessage('Username is required.'),
  // check('username').custom(() => {
  //   const user = userController.getUser()
  //   if (user) {
  //     return Promise.reject('Username already exists.')
  //   }
  // }),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 character.'),
  userController.register
  )

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await mysqlConnection.getUserByUsername(username)
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
    let results = await mysqlConnection.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    res.status(500)
  }
})

export { router }

import express from 'express'
import { body, validationResult, check } from 'express-validator'
import bcrypt from 'bcrypt'
import { db } from '../db/index.js'

const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    let results = await db.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    res.status(500)
  }
})

router.get('/users/:id', async (req, res) => {
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
      res.status(400).json({ errors: errors.array() })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      try {
        const result = await db.addNewUser({ username, hashedPassword })
        res.status(200).json(result)
        res.redirect('/login')
      } catch {
        res.status(500).send()
        res.redirect('/register')
      }
    }
  })

router.post('/login', async (req, res) => {
  const user = await db.getUserByUsername(req.body.username)
  console.log(user)
  if (!user) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

export { router }

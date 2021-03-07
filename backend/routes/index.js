import express from 'express'
import { body, validationResult, check } from 'express-validator'
import { db } from '../db/index.js'

const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    let results = await db.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    console.log(e)
    res.status(500)
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    let results = await db.getUserById(req.params.id)
    res.json(results)
  } catch (e) {
    console.log(e)
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
    const { username, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    try {
      
      const result = await db.addNewUser({ username, password })
      res.status(200).json(result)
    } catch (e) {
      res.status(500)
    }
  })

export { router }

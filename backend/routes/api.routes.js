import express from 'express'
import { body, check } from 'express-validator'
import { mysqlConnection } from '../db/index.js'
import authenticateToken from '../middleware/auth.js'
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

router.post('/login', userController.login)

router.get('/todos', authenticateToken, async (req, res) => {
  try {
    let results = await mysqlConnection.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    res.status(500)
  }
})

export { router }

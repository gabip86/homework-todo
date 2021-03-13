import express from 'express'
import { mysqlConnection } from '../db/index.js'
import authHandler from '../middleware/auth.js'
import { userController } from '../dependencies/dependencyInjections.js'

const router = express.Router()

router.get('/users', authHandler, userController.getAllUser)
router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/todos', authHandler, async (req, res) => {
  try {
    let results = await mysqlConnection.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    res.status(500)
  }
})

export { router }

import express from 'express'
import authHandler from '../middleware/auth.js'
import { userController, todoController } from '../dependencies/dependencyInjections.js'

const router = express.Router()

router.get('/users', authHandler, userController.getAllUser)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/addtodo', authHandler, todoController.addNewTodo)
router.delete('/deletetodo', authHandler, todoController.deleteTodo)
router.get('/auth', authHandler, userController.authUser)

export { router }

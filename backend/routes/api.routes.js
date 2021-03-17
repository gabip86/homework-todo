import express from 'express'
import authHandler from '../middleware/auth.js'
import { userController, todoController } from '../dependencies/dependencyInjections.js'

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/todos', authHandler, todoController.getAllTodo)
router.post('/addtodo', authHandler, todoController.addNewTodo)
router.delete('/deletetodo', authHandler, todoController.deleteTodo)
router.get('/auth', authHandler, userController.authUser)

export { router }

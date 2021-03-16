import { mysqlConnection } from '../db/index.js'
import { UserController } from '../controllers/UserController.js'
import { TodoController } from '../controllers/TodoController.js'
import { UserRepo } from '../repos/UserRepo.js'
import { TodoRepo } from '../repos/TodoRepo.js'
import { UserService } from '../services/UserService.js'
import { TodoService } from '../services/TodoService.js'

export const userRepo = new UserRepo(mysqlConnection)
export const todoRepo = new TodoRepo(mysqlConnection)
export const userService = new UserService(userRepo)
export const todoService = new TodoService(todoRepo)
export const userController = new UserController(userService)
export const todoController = new TodoController(todoService, userService)

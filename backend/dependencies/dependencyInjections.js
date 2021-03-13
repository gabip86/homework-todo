import { mysqlConnection } from '../db/index.js'
import { UserController } from '../controllers/UserController.js'
import { UserRepo } from '../repos/UserRepo.js'
import { UserService } from '../services/UserService.js'

export const userRepo = new UserRepo(mysqlConnection)
export const userService = new UserService(userRepo)
export const userController = new UserController(userService)

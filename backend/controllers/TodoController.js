import { validateRegisterByInputs } from '../services/ValidatorService.js'

export class TodoController {
  constructor(todoService) {
    this.todoService = todoService
    this.getAllTodo = this.getAllTodo.bind(this)
    this.addNewTodo = this.addNewTodo.bind(this)
  }

  async getAllTodo(req, res) {
    try {
      const results = await this.todoService.getAllTodo()
      res.status(200).json(results)
    } catch (e) {
      res.status(500)
    }
  }

  async addNewTodo(req, res) {
    const { text, isDone } = req.body
    const { username } = req.user
    const userId = await this.todoService.getUserIdByUsername(username)
    try {
      const result = await this.todoService.addNewTodo({ text, isDone, userId })
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
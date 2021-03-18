export class TodoController {
  constructor(todoService, userService) {
    this.todoService = todoService
    this.userService = userService
    this.getAllTodo = this.getAllTodo.bind(this)
    this.addNewTodo = this.addNewTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.markTodo = this.markTodo.bind(this)
  }

  async getAllTodo(req, res) {
    try {
      const { username } = req.user
      const userId = await this.userService.getUserIdByUsername(username)
      const results = await this.todoService.getAllTodoById(userId)
      res.status(200).json(results)
    } catch (e) {
      res.status(500)
    }
  }

  async addNewTodo(req, res) {
    const { text, isDone, userId } = req.body
    try {
      const { savedTodo } = await this.todoService.addNewTodo({ text, isDone, userId })
      res.status(200).json(savedTodo)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async markTodo(req, res) {
    const { id } = req.params
    try {
      const result = await this.todoService.markTodo(id)
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async deleteTodo(req, res) {
    const { id } = req.params
    try {
      const result = await this.todoService.deleteTodoById(id)
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

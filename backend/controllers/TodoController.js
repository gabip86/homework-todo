export class TodoController {
  constructor(todoService, userService) {
    this.todoService = todoService
    this.userService = userService
    this.getAllTodo = this.getAllTodo.bind(this)
    this.addNewTodo = this.addNewTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
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
    const { text, isDone } = req.body
    const { username } = req.user
    console.log(text, isDone)
    const userId = await this.todoService.getUserIdByUsername(username)
    try {
      const result = await this.todoService.addNewTodo({ text, isDone, userId })
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async deleteTodo(req, res) {
    const { id } = req.body
    try {
      const result = await this.todoService.deleteTodoById(id)
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

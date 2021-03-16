export class TodoService {
  constructor(todoRepo) {
    this.todoRepo = todoRepo
    this.getAllTodo = this.getAllTodo.bind(this)
    this.getAllTodoById = this.getAllTodoById.bind(this)
    this.addNewTodo = this.addNewTodo.bind(this)
    this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
    this.deleteTodoById = this.deleteTodoById.bind(this)
  }

  async getAllTodo() {
    return this.todoRepo.getAllTodo()
  }

  async getAllTodoById(id) {
    return this.todoRepo.getAllTodoById(id)
  }

  async addNewTodo(inputs) {
    return this.todoRepo.addNewTodo(inputs)
  }

  async deleteTodoById(id) {
    return this.todoRepo.deleteTodoById(id)
  }

  async getUserIdByUsername(username) {
    return this.todoRepo.getUserIdByUsername(username)
  }
}

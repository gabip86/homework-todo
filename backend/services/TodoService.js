export class TodoService {
  constructor(todoRepo, userRepo) {
    this.todoRepo = todoRepo
    this.userRepo = userRepo
    this.getAllTodo = this.getAllTodo.bind(this)
    this.getAllTodoById = this.getAllTodoById.bind(this)
    this.addNewTodo = this.addNewTodo.bind(this)
    this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
    this.deleteTodoById = this.deleteTodoById.bind(this)
    this.markTodo = this.markTodo.bind(this)
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
  
  async markTodo(id) {
    this.todoRepo.markTodo(id)
  }

  async deleteTodoById(id) {
    return this.todoRepo.deleteTodoById(id)
  }

  async getUserIdByUsername(username) {
    return this.userRepo.getUserIdByUsername(username)
  }
}

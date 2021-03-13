export class TodoService {
  constructor(todoRepo) {
    this.todoRepo = todoRepo
    this.getAllTodo = this.getAllTodo.bind(this)
    this.addNewTodo = this.addNewTodo.bind(this)

  }

  async getAllTodo() {
    return this.todoRepo.getAllTodo()
  }

  async addNewTodo(inputs) {
    return this.todoRepo.addNewTodo(inputs)
  }
}

export class TodoRepo {
  constructor(db) {
    this.db = db
  }

  async getAllTodo() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM todos`, (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
    })
  }

  async getAllTodoById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM todos WHERE user_id = ?`, [id], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
    })
  }

  async addNewTodo(inputs) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO todos (text, isDone, user_id) VALUES (?,?,?)`, [inputs.text, inputs.isDone, inputs.userId], (err, results) => {
        if (err) {
          return reject(err)
        }
        const savedTodo = {
          text: inputs.text,
          isDone: inputs.isDone
        }
        return resolve({ savedTodo })
      })
    })
  }

  async markTodo(id) {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE todos SET isDone = 1 WHERE id = ?`, [id], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve({message: 'Todo has been updated to done.'})
      })
    })
  }

  async deleteTodoById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(`DELETE FROM todos WHERE id = ?`, [id], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve({ message: `Todo has been deleted.` })
      })
    })
  }
}

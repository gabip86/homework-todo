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

  async addNewTodo(inputs) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO todos (text, isDone, user_id) VALUES (?,?,?)`, [inputs.text, inputs.isDone, inputs.userId], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve({ message: `${inputs.text} has been added.` })
      })
    })
  }
}
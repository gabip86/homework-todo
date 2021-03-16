export class UserRepo {
  constructor(db) {
    this.db = db
  }

  async userExists(username) {
    const user = this.db.query(`SELECT * FROM user WHERE username = ?`, [username])
    return user ? true : false
  }

  async getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM user WHERE username = ?`, [username], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve(results[0])
      })
    })
  }

  async getUserById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM user WHERE id = ?`, [id], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve(results[0])
      })
    })
  }

  async getAllUser() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM user`, (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
    })
  }

  async addNewUser(inputs) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO user (username, password) VALUES (?,?)`, [inputs.username, inputs.hashedPassword], (err, results) => {
        if (err) {
          return reject(err)
        }
        return resolve({ message: `${inputs.username} has been registered` })
      })
    })
  }

}

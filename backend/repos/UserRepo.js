export class UserRepo {
  constructor(db) {
    this.db = db
  }

  async userExists(username) {
    const user = await this.getUserByUsername(username)
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

  async getUserIdByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT id FROM user WHERE username = ?`, [username], (err, results) => {
        if (err) {
          reject(err)
        }
        if (results[0]) {
          resolve(results[0].id)
        } else {
          resolve(null)
        }
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

export class UserRepo {
  constructor(db) {
    this.db = db
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
}
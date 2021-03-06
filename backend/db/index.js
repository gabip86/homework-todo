import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'todo_app',
})

let db = {}

db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user`, (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve(results)
    })
  })
}

export { db }

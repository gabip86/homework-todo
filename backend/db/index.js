import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'todo_app',
})

let db = {}

db.getAllUser = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user`, (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve(results)
    })
  })
}

db.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user WHERE username = ?`, [username], (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve(results[0])
    })
  })
}

db.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve(results[0])
    })
  })
}

db.addNewUser = (inputs) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO user (username, password) VALUES (?,?)`, [inputs.username, inputs.hashedPassword], (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve({message: `${inputs.username} has been registered`})
    })
  })
}

export { db }

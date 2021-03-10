import mysql from 'mysql2'
import config from '../config.js'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
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

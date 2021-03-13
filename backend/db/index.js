import mysql from 'mysql2'
import config from '../config.js'

const mysqlConnection = mysql.createPool({
  connectionLimit: 10,
  ...config.mysql
})

let db = {}

db.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(`SELECT * FROM user WHERE username = ?`, [username], (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve(results[0])
    })
  })
}

db.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(`SELECT * FROM user WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve(results[0])
    })
  })
}

db.addNewUser = (inputs) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(`INSERT INTO user (username, password) VALUES (?,?)`, [inputs.username, inputs.hashedPassword], (err, results) => {
      if (err) {
        return reject(err)
      }
      return resolve({message: `${inputs.username} has been registered`})
    })
  })
}

export { mysqlConnection }

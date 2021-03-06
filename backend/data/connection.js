import mysql from 'mysql'
import config from '../config'

const pool = mysql.createPool({
  connectionLimit: 12,
  host: config.mysql.MYSQL_HOST,
  user: config.mysql.MYSQL_USER,
  password: config.mysql.MYSQL_PASSWORD,
  database: config.mysql.MYSQL_DATABASE
})

export const db = async (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      resolve({ results, fields })
    })
  })
}

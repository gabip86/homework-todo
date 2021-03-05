import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 12,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
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

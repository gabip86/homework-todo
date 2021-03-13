import mysql from 'mysql2'
import config from '../config.js'

const mysqlConnection = mysql.createPool({
  connectionLimit: 10,
  ...config.mysql
})

export { mysqlConnection }

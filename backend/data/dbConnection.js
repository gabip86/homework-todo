import config from "../config";
import mysql from 'mysql'

const mysqlConn = mysql.createConnection({
  ...config.mysql
});

mysqlConn.connect((err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('db connect')
  }
})

export { mysqlConn }

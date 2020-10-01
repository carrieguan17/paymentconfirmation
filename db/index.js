var mysql = require('mysql');

var db = mysql.createConnection( {
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'checkout'
})

db.connect((err) => {
  if (err) {
    console.log('Error connecting to DB')
  } else {
    console.log("Connected to DB")
  }
})

module.exports = db;
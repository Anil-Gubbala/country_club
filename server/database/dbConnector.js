const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "test@123",
    database: "180B_Test",
    port: "3306"
  });
   
  //db.commit


module.exports = db;
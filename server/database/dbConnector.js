const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "test@123",
    database: "countryclub",
    port: "3306"
  });
   
  //db.commit


module.exports = db;
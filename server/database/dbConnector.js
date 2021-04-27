const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Jan@2021!",
    database: "countryclub",
    port: "3306",
    multipleStatements: true
  });
   
  //db.commit


module.exports = db;
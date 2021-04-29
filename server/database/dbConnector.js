const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "countryclub",
    //port: "3306",
    multipleStatements: true
});

//db.commit


module.exports = db;
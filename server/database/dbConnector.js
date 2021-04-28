const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Force@22",
    database: "countryclub",
    port: "3306",
    multipleStatements: true
});

//db.commit


module.exports = db;
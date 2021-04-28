
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Force@22",
    database: "countryclub",
<<<<<<< HEAD
    port: "3306",
    multipleStatements: true
});

//db.commit
=======
    port: "3306"
  });

  db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  });

  let sql = "SELECT * FROM countryclub.event where event_id='E001'";
db.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});
>>>>>>> 0a8de62... update functionality to  create event with logged in user


module.exports = db;
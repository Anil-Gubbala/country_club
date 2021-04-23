const db = require("../database/dbConnector");
const SQL_ADMIN = require("../database/SQL/Admin/adminSql");

const getPendingUsers = (req, res) => {
    db.query(SQL_ADMIN.GET_PENDING_USER_LIST, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results);
    });
}

const getPendingUsersById = (req, res) => {
    let user_id=req.params.id;
    db.query(SQL_ADMIN.GET_PENDING_USER_BY_ID,[user_id], (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results[0]);
    });
}

module.exports = {
    getPendingUsers,
    getPendingUsersById
};

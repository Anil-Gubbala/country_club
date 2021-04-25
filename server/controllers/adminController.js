const db = require("../database/dbConnector");
const SQL_ADMIN = require("../database/SQL/Admin/adminSql");

const getPendingUsers = (req, res) => {
    db.query(SQL_ADMIN.GET_PENDING_USER_LIST, (error, rows, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(rows);
    });
}

const getUsers = (req, res) => {
    db.query(SQL_ADMIN.GET_USER_LIST, (error, rows, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(rows);
    });
}

const getUsersById = (req, res) => {
    let user_id=req.params.id;
    db.query(SQL_ADMIN.GET_USER_BY_ID,[user_id], (error, rows, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(rows[0]);
    });
}

const approvePendingUser = (req,res) =>{
    let user_id = req.params.id;
    db.query(SQL_ADMIN.APPROVE_USER,[user_id], (error,res,fields) =>{
        if(error){
            return console.error(error.message);
        }
        res.status(200).send({ success: true });
    })
}

module.exports = {
    getPendingUsers,
    getUsers,
    getUsersById,
    approvePendingUser
};

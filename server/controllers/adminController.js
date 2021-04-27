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
    console.log(user_id);
    db.query(SQL_ADMIN.APPROVE_USER,[user_id], (error,res,fields) =>{
        if(error){
            return console.error(error.message);
        }
        res.status(200).send({ success: true });
    })
}

const deleteUser = (req,res) =>{
    let user_id = req.params.id;
    db.query(SQL_ADMIN.DELETE_USER,[user_id], (error,res,fields) =>{
        if(error){
            return console.error(error.message);
        }
        res.status(200).send({ success: true });
    })
}

const createNewAdmin =(req,res) =>{
    const {
        first_name,
        last_name,
        street,
        zip_code,
        city,
        email_id,
        password,
      } = req.body.userDetails;
      
      // Hash password before store in daba
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          res.status(404).send({ err: err.message });
          return;
        } else {

            console.log("in sql.")
          db.query(
            SQL_ADMIN.CREATE_ADMIN,
            [
              first_name,
              last_name,
              email_id,
              street,
              city,
              zip_code,
              hash,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(404).send({
                  err: err.errno === 1062 ? "Username already exists" : err.code,
                });
              } else {
                res.status(200).send({ success: true });
              }
            }
          );
        }
      });
}

module.exports = {
    getPendingUsers,
    getUsers,
    getUsersById,
    approvePendingUser,
    deleteUser,
    createNewAdmin
};

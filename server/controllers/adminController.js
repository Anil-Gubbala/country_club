const db = require("../database/dbConnector");
const SQL_ADMIN = require("../database/SQL/Admin/adminSql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    const {
      user_id
    } = req.body;

    db.query(SQL_ADMIN.APPROVE_USER,[user_id], (error,result,fields) =>{
        if(error){
          console.log(err);
          res.status(404).send({
              err: err.errno === 1062 ? "Error approving user" : err.code
          });
        }else{
        res.status(200).send({ success: true });
        }
    })
}

const deleteUser = (req,res) =>{
    const {
      user_id
    } = req.body;

    db.query(SQL_ADMIN.DELETE_USER,[user_id], (error,result,fields) =>{
        if(error){
          console.log(err);
          res.status(404).send({
              err: err.errno === 1062 ? "Error deleting user" : err.code
          });
        }
        res.status(200).send({ success: true });
    })
}

const updateUser = (req,res) =>{
    const {
        userId,
        isAdmin,
        street,
        city,
        zip_code,
        start_date,
        end_date,
        membership_type
      } = req.body;

    db.query(SQL_ADMIN.UPDATE_USER_DETAILS,
        [
          userId,
          isAdmin,
          street,
          city,
          zip_code,
          start_date,
          end_date,
          membership_type
         ], (err, results, fields) => {

        if (err) {
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error updating event" : err.code
            });
        } else {
            res.status(200).send({ success : true });
        }
    });
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
                res.send({ success: true, user_id: result.insertId });
              }
            }
          );
        }
      });
}

const getAdminList = (req, res) => {
  db.query(SQL_ADMIN.GET_ADMIN_LIST, (error, rows, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(rows);
  });
}

const getDependents = (req, res) => {
  let user_id=req.params.id;
  db.query(SQL_ADMIN.GET_DEPENDENT_LIST, [user_id], (error, rows, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(rows);
});
}

const deleteDependent = (req, res) => {
  const {
    user_id,
    d_name
  } = req.body;

  db.query(SQL_ADMIN.DELETE_DEPENDENT,[user_id, d_name], (error,result,fields) =>{
      if(error){
        console.log(err);
        res.status(404).send({
            err: err.errno === 1062 ? "Error deleting dependent" : err.code
        });
      }
      res.status(200).send({ success: true });
  })
}

const addNewDependent = (req, res) => {
  const {
    user_id,
    d_name,
    relationship
  } = req.body;
console.log(user_id);
  db.query(
    SQL_ADMIN.INSERT_DEPENDENT,
    [
      user_id,
      d_name,
      relationship
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send({
          err: err.errno === 1062 ? "Dependent already exists" : err.code,
        });
      } else {
        res.send({ success: true});
      }
    }
  );
}

module.exports = {
    getPendingUsers,
    getUsers,
    getUsersById,
    approvePendingUser,
    deleteUser,
    updateUser,
    createNewAdmin,
    getAdminList,
    getDependents, 
    deleteDependent,
    addNewDependent
};

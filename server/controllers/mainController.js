const bcrypt = require("bcrypt");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/SQL/User/userSql");
const saltRounds = 10;

const getLogin = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    req.session = null;
    res.send("hello");
  }
};

const setLogin = (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;
  if (req.session.user) {
    res.send({ message: "already logged in" });
  } else {
    db.query(SQL_USER.GET_USER_DETAILS, user_id, (err, result) => {
      if (err) {
        res.status(404).send({ err: err.code });
      } else if (result.length > 0) {
        if(result[0].status == 0){
          res.status(404).send({ err: "Contact Admin for approval" });
          return;
        }
        // pasword compare
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = {
              user_id: result[0].user_id,
              auth_id: result[0].auth_id[0]
            };
            res.send({ user_id: result[0].user_id , auth_id:result[0].auth_id[0]});
          } else {
            res
              .status(404)
              .send({ err: "Wrong username/password combination!" });
          }
        });
      } else {
        res.status(404).send({ err: "User doesn't exist" });
      }
    });
  }
};

const registerUser = (req, res) => {
  const {
    user_id,
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
        SQL_USER.USER_REGISTER,
        [
          user_id,
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
};
module.exports = {
  getLogin,
  registerUser,
  logout,
  setLogin,
};

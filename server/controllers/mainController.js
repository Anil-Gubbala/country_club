const bcrypt = require("bcrypt");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/userSql");
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
  const username = req.body.username;
  const password = req.body.password;
  if (req.session.user) {
    res.send({ message: "already logged in" });
  } else {
    db.query(SQL_USER.GET_USER_DETAILS, username, (err, result) => {
      if (err) {
        res.status(404).send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = {
              username: result[0].username,
              role: result[0].role,
            };
            res.send({ username: result[0].username, role: result[0].role });
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
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(404).send({ err: err });
    }
    db.query(SQL_USER.INSERT_USER, [username, hash], (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send({
          err: err.errno === 1062 ? "Username already exists" : err.code,
        });
      } else {
        res.status(200).send({ success: true });
      }
    });
  });
};
module.exports = {
  getLogin,
  registerUser,
  logout,
  setLogin,
};

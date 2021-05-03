const bcrypt = require("bcrypt");
const db = require("../database/dbConnector");
const { MEMBER_GET } = require("../database/SQL/User/userSql");
const SQL_USER = require("../database/SQL/User/userSql");
const saltRounds = 10;
const logger = require("../modules/logger");

const getLogin = (req, res) => {
  logger.request.info("Validate session");
  if (req.session.user) {
    logger.response.info("Valid : " + JSON.stringify(req.session.user));
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    logger.response.info("loggedIn " + false);
    res.send({ loggedIn: false });
  }
};

const logout = (req, res) => {
  logger.request.info("logout");
  if (req.session.user) {
    logger.response.info("destroyed session");
    req.session.destroy();
    req.session = null;
    res.send("hello");
  }
};

const setLogin = (req, res) => {
  logger.request.info("Set login & session");
  const user_id = req.body.user_id;
  const password = req.body.password;
  let auth_id, membership_type;
  if (req.session.user) {
    logger.response.error("Already logged in ");
    res.send({ message: "already logged in" });
  } else {
    let query = db.query(SQL_USER.GET_USER_DETAILS, user_id, (err, result) => {
      // logger.response.info("check user info : " + query.sql);
      if (err) {
        logger.response.error("sql error : " + err.code);
        res.status(404).send({ err: err.code });
      } else if (result.length > 0) {
        if (result[0].status == "Pending") {
          logger.response.info("Contact Admin for approval");
          res.status(404).send({ err: "Contact Admin for approval" });
          return;
        }
        // pasword compare
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            auth_id = result[0].auth_id[0];
            if (auth_id == 0) {
              let memQuery = db.query(
                SQL_USER.MEMBER_GET,
                user_id,
                (err, result) => {
                  // logger.response.info("Get membership details : " + memQuery.sql);
                  if (err) {
                    logger.response.error("SQL error : " + err.code);
                    res.status(404).send({ err: err.code });
                    return;
                  }
                  membership_type = result[0].membership_type;
                  if (
                    result[0].status == "Expired" ||
                    new Date(result[0].end_date) < new Date()
                  ) {
                    if (
                      result[0].status != "Expired" &&
                      new Date(result[0].end_date) < new Date()
                    ) {
                      db.query(SQL_USER.SET_EXPIRED, user_id, (err, result) => {
                        if (err) {
                          logger.response.error("sql exception " + err.code);
                        }
                      });
                    }
                    logger.response.info(
                      "Membership Expired. Contact Admin for extension"
                    );
                    res.status(404).send({
                      err: "Membership Expired. Contact Admin for extension",
                    });
                    return;
                  } else {
                    // logger.response.info("set user session:  " + user_id);
                    req.session.user = {
                      user_id: user_id,
                      auth_id: auth_id,
                      membership_type: membership_type,
                    };

                    res.send({
                      user_id: user_id,
                      auth_id: auth_id,
                      membership_type: membership_type,
                    });
                  }
                }
              );
            } else {
              // logger.response.info("set user session:  " + user_id);
              req.session.user = {
                user_id: user_id,
                auth_id: auth_id,
                membership_type: 2,
              };
              res.send({
                user_id: user_id,
                auth_id: auth_id,
                membership_type: 2,
              });
            }
          } else {
            logger.response.error("Wrong username/password combination!");
            res
              .status(404)
              .send({ err: "Wrong username/password combination!" });
          }
        });
      } else {
        logger.response.error("user doesnt exist : ");
        res.status(404).send({ err: "User doesn't exist" });
      }
    });
  }
};

const registerUser = (req, res) => {
  logger.request.info("register new user: ");
  let insertId = "";
  let start_date = new Date();
  start_date = start_date.toJSON().substr(0, 10);
  let end_date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  );
  end_date = end_date.toJSON().substr(0, 10);
  const {
    // user_id,
    first_name,
    last_name,
    street,
    zip_code,
    city,
    email_id,
    password,
    membership_type,
  } = req.body.userDetails;
  let dependentList = [];

  // Hash password before store in db
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      logger.response.error("error : " + err.message);
      res.status(404).send({ err: err.message });
      return;
    } else {
      let query = db.beginTransaction(function (err) {
        // logger.response.info("begin transaction: " + query.sql);
        if (err) {
          logger.response.info("sql error: " + err.code);
          res.status(404).send({ err: err.code });
          db.rollback();
          return;
        }
        let registerUser = db.query(
          SQL_USER.USER_REGISTER,
          [
            //user_id,
            first_name,
            last_name,
            email_id,
            street,
            city,
            zip_code,
            hash,
          ],
          (err, result) => {
            // logger.response.info("register user query: " + registerUser.sql);
            if (err) {
              logger.response.error(
                err.errno === 1062 ? "Username already exists" : err.code
              );
              res.status(404).send({
                err: err.errno === 1062 ? "Username already exists" : err.code,
              });
              db.rollback();
              // logger.response.error("rollback()");
              return;
            } else {
              insertId = result.insertId;
              let membersql = db.query(
                SQL_USER.INSERT_MEMBER,
                [insertId, membership_type, start_date, end_date],
                function (err, result) {
                  // logger.response.info("insert membership data : " + membersql.sql);
                  if (err) {
                    // logger.response.error("rollback()");
                    db.rollback();
                    res.status(404).send({
                      err: err.code,
                    });
                    return;
                  }
                  if (membership_type == 1 || membership_type == 2) {
                    if (
                      req.body.dependentsInfo[0] && req.body.dependentsInfo[0].name &&
                      req.body.dependentsInfo[0].name != ""
                    ) {
                      dependentList.push([
                        insertId,
                        req.body.dependentsInfo[0].name,
                        req.body.dependentsInfo[0].relationship,
                      ]);
                    }
                    if (
                      req.body.dependentsInfo[1] && req.body.dependentsInfo[1].name &&
                      req.body.dependentsInfo[1].name != ""
                    ) {
                      dependentList.push([
                        insertId,
                        req.body.dependentsInfo[1].name,
                        req.body.dependentsInfo[1].relationship,
                      ]);
                    }
                  }
                  if (membership_type == 0) {
                    // logger.response.info("commit");
                    db.commit(function (err) {
                      if (err) {
                        db.rollback();
                        logger.response.error(err.code);
                        res.status(404).send({
                          err: err.code,
                        });
                        // logger.response.error("rollback()");
                        return;
                      }
                      logger.response.info("success user_id " + insertId);
                      res
                        .status(200)
                        .send({ success: true, user_id: insertId });
                    });
                  } else {
                    if(dependentList.length > 0){
                      let dependentsSql = db.query(
                        SQL_USER.INSERT_DEPENDENT,
                        [dependentList],
                        (err, result) => {
                          // logger.response.info("insert dependents " + dependentsSql.sql);
                          if (err) {
                            db.rollback();
                            logger.response.error("sql error :" + err.code);
                            res.status(404).send({ err: err.code });
                            // logger.response.error("rollback()");
                            return;
                          }
                          logger.response.info("commit");
                          db.commit(function (err) {
                            if (err) {
                              db.rollback();
                              logger.response.error("error : " + err.code);
                              res.status(404).send({
                                err: err.code,
                              });
                              // logger.response.error("rollback()");
                              return;
                            }
                            logger.response.info("sucess user_id = " + insertId);
                            res
                              .status(200)
                              .send({ success: true, user_id: insertId });
                          });
                        }
                      );
                    }else{
                      db.commit(function (err) {
                        if (err) {
                          db.rollback();
                          logger.response.error("error : " + err.code);
                          res.status(404).send({
                            err: err.code,
                          });
                          // logger.response.error("rollback()");
                          return;
                        }
                        logger.response.info("sucess user_id = " + insertId);
                        res
                          .status(200)
                          .send({ success: true, user_id: insertId });
                      });
                    }
                    
                  }
                }
              );
            }
          }
        );
      });
    }
  });
};

const getMembershipTypes = (req, res) => {
  logger.request.info("get membership types");
  let query = db.query(SQL_USER.GET_MEMBERSHIP_TYPES, [], (error, result) => {
    // logger.response.info("sql : " + query.sql);
    if (error) {
      logger.response.error("sql error: " + error.message);
      res.status(404).send({ err: error.message });
    } else {
      logger.response.info("result : " + JSON.stringify(result));
      res.status(200).send(result);
    }
  });
};

module.exports = {
  getLogin,
  registerUser,
  logout,
  setLogin,
  getMembershipTypes,
};

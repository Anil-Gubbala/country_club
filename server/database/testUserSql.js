const SQL_USER = {
  GET_USER_DETAILS: "SELECT * FROM users WHERE username = ?;",
  INSERT_USER: "INSERT INTO users (username, password) VALUES (?,?)"
};

module.exports = SQL_USER;

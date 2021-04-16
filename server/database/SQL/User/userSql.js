const SQL_USER = {
  GET_USER_DETAILS: "SELECT * FROM user WHERE user_id = ?;",
  INSERT_USER: "INSERT INTO countryclub.user(user_id,f_name, l_name, email_id, street, city, zip_code, password) VALUES (?,?,?,?,?,?,?,?);"
};

module.exports = SQL_USER;

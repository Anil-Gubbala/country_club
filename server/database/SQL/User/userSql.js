const SQL_USER = {
  GET_USER_DETAILS: "SELECT * FROM user WHERE user_id = ?;",
  //USER_REGISTER: "INSERT INTO countryclub.user(user_id,f_name, l_name, email_id, street, city, zip_code, password) VALUES (?,?,?,?,?,?,?,?);"
  USER_REGISTER: "INSERT INTO countryclub.user(f_name, l_name, email_id, street, city, zip_code, password) VALUES (?,?,?,?,?,?,?);"
};
// status: 0-inactive, 1- active, 2-expired
// auth_id: 0-user, 1-admin

module.exports = SQL_USER;

const SQL_ADMIN = {
  GET_PENDING_USER_LIST: "select * from user u inner join member m on u.user_id = m.user_id where status = 'pending'",
  GET_PENDING_USER_BY_ID: "select * from user u inner join member m on u.user_id = m.user_id where status = 'pending' and u.user_id = ?"

  //select u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, m.start_date, m.end_date from user u inner join member m on u.user_id = m.user_id where status = 'pending' and u.user_id = ?
  // GET_PENDING_USER_LIST: "CALL getPendingUsers()",
  // GET_PENDING_USER_BY_ID: "SET @userId = ?; CALL getPendingUsersById(@userId)"
  };
  // status: 0-inactive, 1- active, 2-expired
  // auth_id: 0-user, 1-admin
  
  module.exports = SQL_ADMIN;
  
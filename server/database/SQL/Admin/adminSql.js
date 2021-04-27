const SQL_ADMIN = {
  GET_PENDING_USER_LIST: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, \
                          DATE_FORMAT(m.start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(m.end_date,'%Y-%m-%d') as end_date from user u\
                          inner join member m on u.user_id = m.user_id\
                          where status = 'pending';",

  GET_USER_BY_ID: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, \
                  DATE_FORMAT(m.start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(m.end_date,'%Y-%m-%d') as end_date from user u\
                  inner join member m on u.user_id = m.user_id\
                  where u.user_id = ? ;",
                  
  GET_USER_LIST: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, \
                  DATE_FORMAT(m.start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(m.end_date,'%Y-%m-%d') as end_date from user u \
                  inner join member m on u.user_id = m.user_id \
                  where status not like 'pending';",

  APPROVE_USER: "update user set status = 'confirmed' where user_id = ? and status = 'pending';\
                update member set status = 'confirmed' where user_id = ?  and status = 'pending';",

  DELETE_USER: "CALL deleteUser(?)",

  UPDATE_USER_INFO: "CALL updateUserInfo()",

  CREATE_ADMIN: "INSERT INTO countryclub.user(f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES (?,?,?,?,?,?,?, 1, 'confirmed');"

  };

 
 
  // auth_id: 0-user, 1-admin
  
  module.exports = SQL_ADMIN;
  
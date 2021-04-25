const SQL_ADMIN = {
  GET_PENDING_USER_LIST: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, \
                          m.start_date, m.end_date from user u\
                          inner join member m on u.user_id = m.user_id\
                          where status = 'pending';",

  GET_USER_BY_ID: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, \
                  m.start_date, m.end_date from user u\
                  inner join member m on u.user_id = m.user_id\
                  where u.user_id = _userId and is_admin = 0;",
                  
  GET_USER_LIST: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, \
                  m.start_date, m.end_date from user u \
                  inner join member m on u.user_id = m.user_id \
                  where status = 'pending';",
  APPROVE_USER: ""
  };
 
  // auth_id: 0-user, 1-admin
  
  module.exports = SQL_ADMIN;
  
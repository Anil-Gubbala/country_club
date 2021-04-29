const SQL_USER = {
    GET_USER_DETAILS: "SELECT * FROM user WHERE user_id = ?;",
    USER_REGISTER: "INSERT INTO user(f_name, l_name, email_id, street, city, zip_code, password) VALUES (?,?,?,?,?,?,?);",
    GET_MEMBERSHIP_TYPES: "select * from membership_type;",
    INSERT_MEMBER: "insert into member(user_id, membership_type,start_date, end_date) VALUES(?,?,?,?)",
    INSERT_DEPENDENT: "insert into dependent(user_id, name,relationship) VALUES ?",
    MEMBER_GET: "select * from member where user_id = ?",
    GET_EVENTS_LIST: "select e.event_id,e.event_name,e.e_description,DATE_FORMAT(e.start_date,'%Y-%m-%d') as 'start_date',DATE_FORMAT(e.end_date,'%Y-%m-%d') as end_date,e.status,(e.capacity-e.no_of_participants) as capacity,v.venue_name from event e join venue v on e.venue_id = v.venue_id;",
    UPDATE_EVENTS: "update event  SET no_of_participants = CASE WHEN no_of_participants is null THEN ? ELSE no_of_participants + ? END where event_id = ?;",
};
// status: 0-inactive, 1- active, 2-expired
// auth_id: 0-user, 1-admin

module.exports = SQL_USER;
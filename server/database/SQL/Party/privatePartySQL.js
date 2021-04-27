const PARTY_HALL = {
    PARTY_GET_VENUE : "select * from venue where venue_type = ? and venue_id not in (select hosted_at from party where ? >= start_date and ? <= end_date and status = 'Confirmed'); ",
    PARTY_INSERT : "insert into party(hosted_by,p_name,hosted_at,start_date,end_date,no_of_attendees) values (?,?,?,?,?,?)",
    PARTY_MYBOOKINGS: "select * from party where hosted_by=? order by start_date desc",
    PARTY_CANCEL: "update party set status='Cancelled' where party_id = ?"
  };

  module.exports = PARTY_HALL;
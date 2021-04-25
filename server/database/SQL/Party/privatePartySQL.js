const PARTY_HALL = {
    PARTY_GET_VENUE : "select venue_id, venue_name from venue where venue_type = ? and venue_id not in (select hosted_at from party where ? >= start_date and ? <= end_date); ",
    PARTY_INSERT : "insert into countryclub.party(party_id, hosted_by,p_name,hosted_at,start_date,end_date,no_of_attendees) values (?,?,?,?,?,?,?)",
    PARTY_MYBOOKINGS: "select * from party where hosted_by=? order by start_date desc"
  };

  module.exports = PARTY_HALL;
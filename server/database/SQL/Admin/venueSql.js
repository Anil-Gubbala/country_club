const SQL_VENUE = {
    GET_VENUE_LIST: "SELECT * from countryclub.venue",
    CREATE_VENUE: "INSERT INTO countryclub.venue(venue_name, venue_type) VALUES (?,?)",
    READ_VENUE: "SELECT * from countryclub.venue where venue_id=?" ,
    UPDATE_VENUE: "UPDATE countryclub.VENUE SET venue_name=?,venue_type=? where venue_id=?",
    DELETE_VENUE: "DELETE from countryclub.VENUE where venue_id=?",
    GET_VENUE_TYPE: "SELECT * FROM venue_type"
  };
  
  module.exports = SQL_VENUE;
  
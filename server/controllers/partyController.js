const db = require("../database/dbConnector");
const {
  PARTY_GET_VENUE,
  PARTY_INSERT,PARTY_MYBOOKINGS,
} = require("../database/SQL/Party/privatePartySQL");
const { v4: uuidv4 } = require("uuid");

const partyGetVenues = (req, res) => {
  db.query(
    PARTY_GET_VENUE,
    [0, req.query.date, req.query.date],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        res.send([]);
      } else {
        res.send(result);
      }
    }
  );
};

const partyInsert = (req, res) => {
  if (!req.session.user) {
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(
    PARTY_INSERT,
    [req.session.user.user_id, req.body.event_name, req.body.venue_id,req.body.start_date,req.body.end_date,req.body.no_of_attendees],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        res.send([]);
      } else {
        res.send(result);
      }
    }
  );
};

const partyGetBookings = (req,res) => {
  if (!req.session.user) {
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(PARTY_MYBOOKINGS,[req.session.user.user_id],((error, result)=>{
    if(error){
      res.status(404).send({ err: error.code });
    }else if(result.length == 0){
      res.send([]);
    }else{
      res.send(result);
    }
  }))
}

module.exports = {
  partyGetVenues,
  partyInsert,partyGetBookings
};

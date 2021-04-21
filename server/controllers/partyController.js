const db = require("../database/dbConnector");
const { PARTY_GET_VENUE,PARTY_INSERT } = require("../database/SQL/Party/privatePartySQL");

const partyGetVenues = (req, res) => {
  db.query(PARTY_GET_VENUE, [0,req.query.date,req.query.date,],(error, result) => {
    if (error) {
        res.status(404).send({ err: error.code });
        return;
    }else if(result.length == 0){
        res.send([]);
    }else{
        res.send(result);
    }
  });
};

const partyInsert = (req, res) => {
    db.query(PARTY_INSERT, [0,req.query.date,req.query.date,],(error, result) => {
      if (error) {
          res.status(404).send({ err: error.code });
          return;
      }else if(result.length == 0){
          res.send([]);
      }else{
          res.send(result);
      }
    });
  };

module.exports = {
 partyGetVenues, partyInsert
};

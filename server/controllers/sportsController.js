const db = require("../database/dbConnector");

const {
  GET_ALL_SPORTS,GET_SPORT_TIME,GET_SPORT_BOOKING_SLOT,
    SPORTS_BOOKING_INSERT, CANCEL_SPORTS_BOOKING, GET_SPORTS_HISTORY,UPDATE_BOOKING_STATUS
} = require("../database/SQL/Sports/sportsSQL");
const { v4: uuidv4 } = require("uuid");


const getAllSports= (req, res) => {
  db.query(GET_ALL_SPORTS,(error, result) => {
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


const getBookingSlot = (req, res) => {
  console.log(req.query.s_name);
    db.query(GET_SPORT_BOOKING_SLOT,[req.query.s_name,req.query.s_name],(error, result) => {
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
  
const sportsBookingInsert = (req, res) => {
    if (!req.session.user) {
      res.status(404).send({ err: "Invalid user session" });
      return;
    }
    db.query(SPORTS_BOOKING_INSERT,[NULL,req.query.date,req.body.sport_id,req.session.user.user_id,req.body.ts_id],
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
  
const  cancelSportsBooking = (req,res) => {
    if (!req.session.user) {
      res.status(404).send({ err: "Invalid user session" });
      return;
    }
    db.query(CANCEL_SPORTS_BOOKING,[req.body.booking_id,req.body.s_name], (error, result) => {
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

const getSportsHistory = (req,res) => {
    if (!req.session.user) {
      res.status(404).send({ err: "Invalid user session" });
      return;
    }
    db.query(GET_SPORTS_HISTORY, [req.session.user.user_id],((error, result)=>{
      if(error){
        res.status(404).send({ err: error.code });
      }else if(result.length == 0){
        res.send([]);
      }else{
        res.send(result);
      }
    }));
};
  


const postBookiongStatus = (req, res) => {
    db.query(UPDATE_BOOKING_STATUS,[req.body.booking_id], (error, rows, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(rows);
    }
    )
};
  
  

  module.exports = {
    getAllSports,
    getBookingSlot,
    sportsBookingInsert,
    cancelSportsBooking,
    getSportsHistory,
    postBookiongStatus
};
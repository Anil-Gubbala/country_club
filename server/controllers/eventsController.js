const db = require("../database/dbConnector");
const SQL_EVENTS = require("../database/SQL/Admin/eventSql");
//const { v4: uuidv4 } = require("uuid");

const getEvents = (req, res) => {
    db.query(SQL_EVENTS.GET_EVENTS_LIST, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results);
    });
}

const createEvent = (req, res) => {
    //const event_id = uuidv4();
    const {
        event_name,
        e_description,
        start_date,
        end_date,
        status,
        venue_id,
        capacity,
        organized_by
    } = req.body.eventDetails;
    db.query(
        SQL_EVENTS.CREATE_EVENT,
        [
            event_name,
            e_description,
            start_date,
            end_date,
            status,
            venue_id,
            capacity,
            organized_by
         ],
         (err, result) => {
             if (err) {
                 console.log(err);
                 res.status(404).send({
                     err: err.errno === 1062 ? "Error creating new event" : err.code
                 });
             } else {
                 res.status(200).send({ success : true });
             }
         }
    )


}

const readEvent = (req, res) => {
    let event_id=req.params.id;
    db.query(SQL_EVENTS.READ_EVENT,[event_id], (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results[0]);
    });
}

const getVenue = (req, res) => {
    db.query(SQL_EVENTS.GET_VENUE, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results);
    });
}

const updateEvent = (req, res) => {
    const {
        event_name,
        e_description,
        start_date,
        end_date,
        status,
        venue_id,
        capacity,
        organized_by,
        event_id
    } = req.body;
    db.query(SQL_EVENTS.UPDATE_EVENT,
        [
            event_name,
            e_description,
            start_date,
            end_date,
            status,
            venue_id,
            capacity,
            organized_by,
            event_id
         ], (error, results, fields) => {

        if (error) {
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error updating event" : err.code
            });
        } else {
            res.status(200).send({ success : true });
        }
    });
}


const deleteEvent = (req, res) => {
    const {
        event_id
    } = req.body;
    db.query(SQL_EVENTS.DELETE_EVENT,
        [
            event_id
         ], (error, results, fields) => {

        if (error) {
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error deleting event" : err.code
            });
        } else {
            res.status(200).send({ success : true });
        }
    });
}


module.exports = {
  createEvent,
  getEvents,
  readEvent,
  getVenue,
  updateEvent,
  deleteEvent
};

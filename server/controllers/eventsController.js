const db = require("../database/dbConnector");
const SQL_EVENTS = require("../database/SQL/Admin/eventSql");

const createEvent = (req, res) => {
    const {
        event_id,
        event_name,
        e_description,
        start_date,
        end_date,
        status,
        venue_id,
        capacity,
        no_of_participants,
        organized_by
    } =  req.body.eventDetails;
    db.query(
        SQL_EVENTS.CREATE_EVENT,
        [
            event_id,
            event_name,
            e_description,
            start_date,
            end_date,
            status,
            venue_id,
            capacity,
            no_of_participants,
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


module.exports = {
  createEvent

};

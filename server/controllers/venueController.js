const db = require("../database/dbConnector");
const SQL_VENUE = require("../database/SQL/Admin/venueSql");


const getVenueDetails = (req, res) => {
    db.query(SQL_VENUE.GET_VENUE_LIST, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results);
    });
}

const createVenue = (req, res) => {
    const {
        venue_name,
        venue_type
    } = req.body.venueDetails;
    db.query(
        SQL_VENUE.CREATE_VENUE,
        [
            venue_name,
            venue_type
         ],
         (err, result) => {
             if (err) {
                 console.log(err);
                 res.status(404).send({
                     err: err.errno === 1062 ? "Error creating new venue" : err.code
                 });
             } else {
                 res.status(200).send({ success : true });
             }
         }
    )


}

const readVenue = (req, res) => {
    let venue_id=req.params.id;
    db.query(SQL_VENUE.READ_VENUE,[venue_id], (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results[0]);
    });
}

const getVenueType = (req, res) => {
    db.query(SQL_VENUE.GET_VENUE_TYPE, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        res.send(results);
    });
}

const updateVenue = (req, res) => {
    const {
        venue_id,
        venue_name,
        venue_type
    } = req.body;
    db.query(SQL_VENUE.UPDATE_VENUE,
        [
            venue_name,
            venue_type,
            venue_id
         ], (err, results, fields) => {

        if (err) {
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error updating venue" : err.code
            });
        } else {
            res.status(200).send({ success : true });
        }
    });
}


const deleteVenue= (req, res) => {
    const {
        venue_id
    } = req.body;
    db.query(SQL_VENUE.DELETE_VENUE,
        [
            venue_id
         ], (error, results, fields) => {

        if (error) {
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error deleting venue" : err.code
            });
        } 
        res.send({ message: "deleted" });
    });
}


module.exports = {
  createVenue,
  getVenueDetails,
  readVenue,
  getVenueType,
  updateVenue,
  deleteVenue
};

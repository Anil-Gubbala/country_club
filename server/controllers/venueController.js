const db = require("../database/dbConnector");
const SQL_VENUE = require("../database/SQL/Admin/venueSql");
const logger = require('../modules/logger');


const getVenueDetails = (req, res) => {
    logger.request.info("get venue list");
    db.query(SQL_VENUE.GET_VENUE_LIST, (error, results, fields) => {
        if (error) {
            logger.request.error("get venue list error " + error.message);
          return console.error(error.message);
        }
        logger.response.info("venue list : " + results);
        res.send(results);
    });
}

const createVenue = (req, res) => {
    logger.request.info("add new venue");
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
                logger.request.error("add new venue error " + err.message);
                 console.log(err);
                 res.status(404).send({
                     err: err.errno === 1062 ? "Error creating new venue" : err.code
                 });
             } else {
                logger.response.info("add new venue success: " + results);
                 res.status(200).send({ success : true });
             }
         }
    )


}

const readVenue = (req, res) => {
    logger.request.info("read venue with id: " + req.params.id);
    let venue_id=req.params.id;
    db.query(SQL_VENUE.READ_VENUE,[venue_id], (error, results, fields) => {
        if (error) {
            logger.request.error("read venue error: " + error.message);
          return console.error(error.message);
        }
        logger.response.info("read venue success: " + results[0]);
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
    logger.request.info("update venue");
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
            logger.request.error("update venue error: " + error.message);
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error updating venue" : err.code
            });
        } else {
            logger.response.info("update venue success: " + results);
            res.status(200).send({ success : true });
        }
    });
}


const deleteVenue= (req, res) => {
    logger.request.info("delete venue");
    const {
        venue_id
    } = req.body;
    db.query(GET_VENUE_ID, [
        venue_id
    ], (error, results, fields) => {
        if(error) {
            logger.request.error("delete venue error: " + error.message);
            console.log(err);
            res.status(404).send({
                err: err.errno === 1062 ? "Error deleting venue" : err.code
            });
        } 
        if(results.data.length == 0) {
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
                logger.response.info("delete venue success: " + results);
                res.send({ message: "deleted" });
            });
        } else {
            logger.request.error("delete venue error: " + error.message);
            res.status(404).send({
                err: err.errno === 1062 ? "Cannot delete venue since its associated with one or more events" : err.code
            });
        }
    })
    
}


module.exports = {
  createVenue,
  getVenueDetails,
  readVenue,
  getVenueType,
  updateVenue,
  deleteVenue
};

const SPORTS_SECTION ={
    GET_ALL_SPORTS : "select * from sports;",
    
    GET_SPORT_BOOKING_SLOT: "select s_name, time_slot.start_time, time_slot.end_time, sports.venue_id \
                                from sports , time_slot, sport_time \
                                where  sports.sport_id=sport_time.sport_id \
                                and time_slot.ts_id=sport_time.ts_id \
                                and sports.sport_id in ( select sport_id from sports where s_name=?) \
                                and time_slot.ts_id not in ( select ts_id from sports_booking where sport_id in ( select sport_id from sports where s_name=?));",

    SPORTS_BOOKING_INSERT : "insert into sports_booking(status,booking_date,sports_id,user_id,ts_id) values(?,?,?,?,?);",

    CANCEL_SPORTS_BOOKING : "Update countryclub.sports_booking set status='Cancelled' where booking_id=? and sport_id in ( select sport_id from sports where s_name= ?);",

    GET_SPORTS_HISTORY : "select booking_id, s_name , booking_date,time_slot.start_time, time_slot.end_time ,status from sports_booking ,sports, time_slot \
                            where time_slot.ts_id = sports_booking.ts_id \
                            and sports_booking.sport_id = sports.sport_id \
                            and user_id=?;",

    UPDATE_BOOKING_STATUS : "DELIMITER $$ \
                            create trigger status_update \
                            after INSERT ON sports_booking for each row \
                            BEGIN IF new.status ='NULL' then \
                            update sports_booking set new.status = 'BOOKED' where booking_id = new.booking_id; \
                            END IF; \
                            END$$ "

};
  
  module.exports = SPORTS_SECTION;
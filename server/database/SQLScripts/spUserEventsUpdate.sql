USE countryclub;
DELIMITER $$
DROP PROCEDURE IF EXISTS update_Events;
SET autocommit = ON;
CREATE PROCEDURE update_Events
(
	 IN participants INT,
    IN eventId INT,
    IN userId INT,
    OUT update_result INT
)
BEGIN
   DECLARE exit handler for sqlexception
   BEGIN
     SET update_result = -2;
   ROLLBACK;
   END;
   DECLARE exit handler for sqlwarning
   BEGIN
      SET update_result = -1;
   ROLLBACK;
   END;
   
  
	START TRANSACTION;
    UPDATE event  SET no_of_participants = 
											CASE WHEN no_of_participants IS NULL 
											THEN participants 
											ELSE no_of_participants +  participants
											END 
											WHERE event_id = eventId;
       if not exists(select * from event_booking where event_id = eventId and user_id = userId and status = 'confirm') 
        then
	INSERT INTO EVENT_BOOKING(user_id, event_id, booking_date, status) VALUES(userId, eventId, CURDATE(), 'confirm');
    end if;
   COMMIT;
   SET update_Result=1;
   
END$$
DELIMITER ;

#CALL update_Events(1,1001,@res);
#SELECT @res;




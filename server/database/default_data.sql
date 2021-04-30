-- -------------------------------------------------------------
-- ---DEFAUTL DATA (If Admin side add these insertion, we can remove from here)--------------------
-- ----------------------------------------------------------------
-- event status
insert into event_status(status) values("Confirmed");
insert into event_status(status) values("Cancelled");
insert into event_status(status) values("Modified");
insert into event_status(status) values("Pending");

-- user status
insert into user_status(status) values("Pending");
insert into user_status(status) values("Active");
insert into user_status(status) values("Expired");

-- venue type
INSERT INTO venue_type (venue_type) VALUES("private_party");

-- venue data. 
INSERT INTO venue (venue_id, venue_name,venue_type, capacity) VALUES(0,"Hall 01","private_party",50);
INSERT INTO venue (venue_id, venue_name, venue_type, capacity) VALUES (1,"Hall 02","private_party",100);
INSERT INTO venue (venue_id, venue_name, venue_type, capacity) VALUES (2,"Hall 03","private_party",25);

-- membership_type
INSERT INTO membership_type (type_id, name, description,dependent_count) VALUES (0, "Silver", "eligible to participate in all events",0);
INSERT INTO membership_type (type_id, name,  description,dependent_count) VALUES (1, "Gold", "Silver user privileges + elgible to enroll 2 dependents",2);
INSERT INTO membership_type (type_id, name,  description,dependent_count) VALUES (2, "Platinum", "Gold user privileges + access to organize own private events",2);

-- root or admin
INSERT INTO countryclub.user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1001', 'admin', '1', 'admin@gmail.com', 'admin', 'admin', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'1', '1');


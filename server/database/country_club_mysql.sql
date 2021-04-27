drop database  if exists countryclub;
create database countryclub;
use countryclub;

create table user (
	user_id int auto_increment not null,
  	f_name varchar(25) not null,
  	l_name varchar(25) not null,
  	email_id varchar(25) not null,
  	street varchar(25) not null,
  	city varchar(25) not null,
  	zip_code varchar(6) not null,
  	password varchar(100) not null,
  	auth_id bit default b'0' not null,
  	status varchar(25) default 0 not null,
  	primary key (user_id)
);

create table user_status
(
	status varchar(25) not null unique
);
create table event_status
(
	status varchar(25) not null unique
);

-- membership_type: used for dropdown
create table membership_type
(
	type_id int not null unique,
	name varchar(15) not null,
	description varchar(100) not null,
	dependent_count int not null
);

create table member
(
	 user_id int not null,
	 membership_type int not null,
	 start_date date not null,
	 end_date date not null,
	 foreign key (membership_type) references membership_type (type_id) on update cascade on delete cascade, 
	 foreign key (user_id) references user (user_id) on update cascade on delete cascade 
);



create table dependent
(
	name varchar(100) not null,
	user_id int not null,
	relationship varchar(50) default "Family Member" not null,
	primary key (user_id, name),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade
);

-- relationship: used for dropdown
create table relationship
(
	r_name varchar(50) not null unique
);

-- venue_type: used for dropdown
create table venue_type
(
	venue_type varchar(25) not null unique
);

create table venue
(
	venue_id int auto_increment not null,
	venue_name varchar(50) not null,
	capacity int not null,
	venue_type varchar(25) not null, 
	primary key (venue_id),
	foreign key (venue_type) references venue_type (venue_type) on update cascade on delete cascade    
);



create table sports
(
	sport_id int auto_increment not null,
	s_name varchar(50),
	venue_id int not null,
	start_time time,
	end_time time,
	primary key (sport_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

create table time_slot
(
	ts_id int auto_increment not null,
	start_time time,
	end_time time,
	primary key(ts_id)
);

create table sport_time
 (
	ts_id int auto_increment not null,
	sport_id int not null,
	primary key(ts_id, sport_id),
	foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade,
	foreign key (ts_id) references time_slot (ts_id) on delete cascade on update cascade
 );

create table sports_booking
(
	booking_id int auto_increment unique,
	status varchar(25),
	booking_date date,
	sport_id int not null,
	user_id int not null,
	ts_id int not null,
	primary key(user_id,sport_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade,
	foreign key (ts_id) references time_slot (ts_id) on delete cascade on update cascade
);

create table event
(
	event_id int auto_increment not null,
	event_name varchar(50) not null,
	e_description varchar(100),
	start_date date,
	end_date date,
	status varchar(25),
	venue_id int not null,
	capacity int,
	no_of_participants int,
	organized_by int not null,
	primary key (event_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade,
	foreign key (organized_by) references user (user_id) on update cascade on delete cascade,
	foreign key (status) references event_status(status) on update cascade on delete cascade
);

create table event_booking
(
	booking_id int auto_increment not null,
	user_id int not null,
	event_id int not null,
	booking_date date,
	status varchar(25),
	primary key (booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (event_id) references event (event_id) on update cascade on delete cascade
);


create table dining (
	dining_id int auto_increment not null,
	type varchar(25),
	venue_id int not null,
	capacity int,
	start_time time,
	end_time time,
	primary key (dining_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

create table reservation (
	reservation_id int auto_increment not null, 
	reservation_date date,
	status varchar(25),
	no_of_ppl int,
	user_id int not null,
	dining_id int not null,
	primary key(reservation_id),
	foreign key (user_id) references member(user_id) on update cascade on delete cascade,
	foreign key (dining_id) references dining(dining_id) on update cascade on delete cascade
);

Create table party (
	party_id int auto_increment not null, 
	hosted_by int not null,
	p_name varchar(50) not null,
	hosted_at int not null,
	start_date date not null,
	end_date date not null ,
	no_of_attendees int not null,
	status varchar(25) default "Confirmed" not null,
	primary key (party_id),
	foreign key (hosted_by) references user(user_id) on update cascade on delete cascade,
	foreign key (hosted_at) references venue(venue_id) on update cascade on delete cascade
);

alter table user auto_increment = 1001;
alter table venue auto_increment = 1001;
alter table sports auto_increment = 1001;
alter table time_slot auto_increment = 1001;
alter table sports_booking auto_increment = 1001;
alter table event auto_increment = 1001;
alter table event_booking auto_increment = 1001;
alter table dining auto_increment = 1001;
alter table reservation auto_increment = 1001;
alter table party auto_increment = 1001;

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



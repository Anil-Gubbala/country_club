drop database  if exists countryclub;
create database countryclub;
use countryclub;

create table user (
	-- user_no int auto_increment not null,
  	-- user_id as 'USR' + right('000000' + convert(varchar(7), user_no), 7) persisted,
	user_id varchar(10) not null unique,
  	f_name varchar(25) not null,
  	l_name varchar(25) not null,
  	email_id varchar(25) not null,
  	street varchar(25) not null,
  	city varchar(25) not null,
  	zip_code varchar(6) not null,
  	password varchar(100) not null,
  	auth_id bit default 0 not null,
  	status varchar(25),
  	primary key (user_id)
);

create table status
(
	status_name varchar(25) not null unique
);

create table member
(
	 user_id varchar(10) unique not null,
	 membership_type varchar(50) not null,
	 start_date date not null,
	 end_date date not null,
	 foreign key (user_id) references user (user_id) on update cascade on delete cascade 
);

-- membership_type: used for dropdown
create table membership_type
(
	membership_type varchar(50) not null unique
);

create table dependent
(
	name varchar(100) not null,
	user_id varchar(10) not null,
	relationship varchar(50),
	primary key (user_id, name),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade
);

-- relationship: used for dropdown
create table relationship
(
	r_name varchar(50) not null unique
);

create table venue
(
	venue_id varchar(10) not null,
	venue_name varchar(50),
	venue_type int, -- 0:private_hall
	primary key (venue_id)    
);

-- venue_type: used for dropdown
create table venue_type
(
	venue_type varchar(25) not null unique
);

create table sports
(
	sport_id varchar(10) not null,
	s_name varchar(50),
	venue_id varchar(10),
	start_time time,
	end_time time,
	primary key (sport_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

create table time_slot
(
	ts_id varchar(10) not null,
	start_time time,
	end_time time,
	primary key(ts_id)
);

create table sports_booking
(
	booking_id varchar(10) not null,
	status varchar(25),
	booking_date date,
	sport_id varchar(10),
	user_id varchar(10),
	ts_id varchar(10),
	primary key(booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade,
	foreign key (ts_id) references time_slot (ts_id) on delete cascade on update cascade
);

create table event
(
	event_id varchar(10) not null,
	event_name varchar(50) not null,
	e_description varchar(100),
	start_date date,
	end_date date,
	status varchar(25),
	venue_id varchar(10),
	capacity int,
	no_of_participants int,
	organized_by varchar(50) not null,
	primary key (event_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade,
	foreign key (organized_by) references user (user_id) on update cascade on delete cascade
);

create table event_booking
(
	booking_id varchar(10) unique not null,
	user_id varchar(10),
	event_id varchar(10),
	booking_date date,
	status varchar(25),
	primary key (booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (event_id) references event (event_id) on update cascade on delete cascade
);


create table dining (
	dining_id varchar(10) unique not null,
	type varchar(25),
	venue_id varchar(10),
	capacity int,
	start_time time,
	end_time time,
	primary key (dining_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

create table reservation (
	reservation_id varchar(10) unique not null, 
	reservation_date date,
	status varchar(25),
	no_of_ppl int,
	user_id varchar(10),
	dining_id varchar(10),
	primary key(reservation_id),
	foreign key (user_id) references member(user_id) on update cascade on delete cascade,
	foreign key (dining_id) references dining(dining_id) on update cascade on delete cascade
);

Create table party (
	party_id varchar(50) unique not null, 
	hosted_by varchar(50) ,
	p_name varchar(50),
	hosted_at varchar(50),
	start_date date,
	end_date date,
	no_of_attendees int,
	status varchar(25) DEFAULT '0',
	primary key (party_id),
	foreign key (hosted_by) references user(user_id) on update cascade on delete cascade,
	foreign key (hosted_at) references venue(venue_id) on update cascade on delete cascade
);

-- venue data. 
INSERT INTO countryclub.venue
(venue_id,
venue_name,
venue_type)
VALUES
(0,"hall_1",0);
INSERT INTO countryclub.venue
(venue_id,
venue_name,
venue_type)
VALUES
(1,"hall_2",0);
INSERT INTO countryclub.venue
(venue_id,
venue_name,
venue_type)
VALUES
(2,"hall_3",0);

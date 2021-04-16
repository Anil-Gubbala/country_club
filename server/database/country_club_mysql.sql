drop database  if exists countryclub;
create database countryclub;
use countryclub;

create table user (
  user_id varchar(50) NOT NULL,
  f_name varchar(100) NOT NULL,
  l_name varchar(100) NOT NULL,
  email_id varchar(120) NOT NULL,
  street varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  zip_code varchar(45) NOT NULL,
  password varchar(100) NOT NULL,
  auth_id int NOT NULL DEFAULT 0,
  status int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id)
);


create table member
(
	 user_id varchar(50) unique not null,
	 membership_type varchar(50) not null,
	 start_date date not null,
	 end_date date not null,
	 foreign key (user_id) references user (user_id) on update cascade on delete cascade 
);

create table dependent
(
	name varchar(100) not null,
	user_id varchar(50) not null,
	relationship varchar(50),
	primary key (user_id, name),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade
);

create table venue
(
	venue_id varchar(50) not null,
	venue_name varchar(50),
	venue_type varchar(25),
	primary key (venue_id)    
);

create table sports
(
	sport_id varchar(50) not null,
	s_name varchar(50),
	venue_id varchar(50),
	primary key (sport_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

create table time_slot
(
	ts_id varchar(50) not null,
	slot_start_time time,
	slot_end_time time,
	primary key(ts_id)
);

create table sports_booking
(
	booking_id varchar(50) not null,
	status varchar(25),
	booking_date date,
	sport_id varchar(50),
	user_id varchar(50),
	ts_id varchar(50),
	primary key(booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade,
	foreign key (ts_id) references time_slot (ts_id) on delete cascade on update cascade
);

create table event
(
	event_id varchar(50) not null,
	event_name varchar(50) not null,
	e_description varchar(100),
	start_date date,
	end_date date,
	status varchar(25),
	venue_id varchar(50),
	capacity int,
	no_of_participants int,
	organized_by varchar(50) not null,
	primary key (event_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade,
	foreign key (organized_by) references user (user_id) on update cascade on delete cascade
);

create table event_booking
(
	booking_id varchar(50) unique not null,
	user_id varchar(50),
	event_id varchar(50),
	booking_date date,
	status varchar(25),
	primary key (booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (event_id) references event (event_id) on update cascade on delete cascade
);


create table dining (
	dining_id varchar(50) unique not null,
	type varchar(25),
	capacity int,
	booking_time time,
	primary key (dining_id)
);

create table reservation (
	reservation_id varchar(50) unique not null, 
	reservation_date date,
	status varchar(25),
	no_of_ppl int,
	user_id varchar(50),
	dining_id varchar(50),
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
	status varchar(25),
	primary key (party_id),
	foreign key (hosted_by) references member(user_id) on update cascade on delete cascade,
	foreign key (hosted_at) references venue(venue_id) on update cascade on delete cascade
);

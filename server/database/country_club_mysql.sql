drop database  if exists countryclub;
create database countryclub;
use countryclub;

create table user (
	user_id int auto_increment not null unique,
  	f_name varchar(100) not null,
  	l_name varchar(100) not null,
  	email_id varchar(120) not null,
  	street varchar(255) not null,
  	city varchar(255) not null,
  	zip_code varchar(5) not null,
  	password varchar(100) not null,
  	is_admin bit default 0 not null,
  	status varchar(25),
  	primary key (user_id)
);

alter table user auto_increment = 1001;

create table status
(
	status_name varchar(25) not null unique
);

create table member
(
	 user_id int not null,
	 membership_type varchar(50) not null,
	 start_date date not null,
	 end_date date not null,
	 status varchar(25),
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
	user_id int not null,
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
	venue_id int auto_increment not null,
	venue_name varchar(50),
	venue_type varchar(25),
	primary key (venue_id)    
);

alter table venue auto_increment = 1001;

-- venue_type: used for dropdown
create table venue_type
(
	venue_type varchar(25) not null unique
);

create table sports
(
	sport_id int auto_increment not null,
	s_name varchar(50),
	venue_id int,
	start_time time,
	end_time time,
	primary key (sport_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

alter table sports auto_increment = 1001;

create table time_slot
(
	ts_id int auto_increment not null,
	start_time time,
	end_time time,
	primary key(ts_id)
);

alter table time_slot auto_increment = 1001;

create table sports_booking
(
	booking_id int auto_increment not null,
	status varchar(25),
	booking_date date,
	sport_id int,
	user_id int,
	ts_id int,
	primary key(booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade,
	foreign key (ts_id) references time_slot (ts_id) on delete cascade on update cascade
);

alter table sports_booking auto_increment = 1001;

create table event
(
	event_id int auto_increment not null,
	event_name varchar(50) not null,
	e_description varchar(100),
	start_date date,
	end_date date,
	status varchar(25),
	venue_id int,
	capacity int,
	no_of_participants int,
	organized_by int not null,
	primary key (event_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade,
	foreign key (organized_by) references user (user_id) on update cascade on delete cascade
);

alter table event auto_increment = 1001;

create table event_booking
(
	booking_id int auto_increment unique not null,
	user_id int,
	event_id int,
	booking_date date,
	status varchar(25),
	primary key (booking_id),
	foreign key (user_id) references user (user_id) on update cascade on delete cascade,
	foreign key (event_id) references event (event_id) on update cascade on delete cascade
);

alter table event_booking auto_increment = 1001;

create table dining (
	dining_id int auto_increment unique not null,
	type varchar(25),
	venue_id int,
	capacity int,
	start_time time,
	end_time time,
	primary key (dining_id),
	foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

alter table dining auto_increment = 1001;

create table reservation (
	reservation_id int auto_increment unique not null, 
	reservation_date date,
	status varchar(25),
	no_of_ppl int,
	user_id int,
	dining_id int,
	primary key(reservation_id),
	foreign key (user_id) references member(user_id) on update cascade on delete cascade,
	foreign key (dining_id) references dining(dining_id) on update cascade on delete cascade
);

alter table reservation auto_increment = 1001;

Create table party (
	party_id int auto_increment unique not null, 
	hosted_by int,
	p_name varchar(50),
	hosted_at int,
	start_date date,
	end_date date,
	no_of_attendees int,
	status varchar(25),
	primary key (party_id),
	foreign key (hosted_by) references member(user_id) on update cascade on delete cascade,
	foreign key (hosted_at) references venue(venue_id) on update cascade on delete cascade
);

alter table party auto_increment = 1001;
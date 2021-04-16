drop database  if exists countryclub;
create database countryclub;
use countryclub;

CREATE TABLE user (
  user_id varchar(50) NOT NULL,
  f_name varchar(100) NOT NULL,
  l_name varchar(100) NOT NULL,
  email_id varchar(120) NOT NULL,
  street varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  zip_code varchar(20) NOT NULL,
  password varchar(100) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY email_id (email_id)
);


create table member
(
    user_id varchar(50) unique not null,
    membership_type varchar(50) not null,
    start_date date,
    end_date date,
    foreign key (user_id) references user (user_id) on update cascade on delete cascade 
);

create table dependent
(
    name varchar(50) not null,
    user_id varchar(50) not null,
    relationship varchar(50),
    primary key (name, user_id),
    foreign key (user_id) references user (user_id) on update cascade on delete cascade
);

create table venue
(
    venue_id int not null,
    venue_name varchar(25),
    venue_type varchar(25),
    
    primary key (venue_id)    
);

create table sports
(
sport_id varchar(50) not null,
s_name varchar(50),
venue_id int,
primary key (sport_id),
foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);
create table time_slot
(
ts_id int not null,
slot_start_time time,
slot_end_time time,
sport_id varchar(50),
primary key(ts_id),
foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade
);

create table sports_booking
(
booking_id int not null,
status varchar(25),
booking_date date,
sport_id varchar(50),
user_id varchar(50),
primary key(sport_id,user_id),
foreign key (user_id) references user (user_id) on update cascade on delete cascade,
foreign key (sport_id) references sports(sport_id) on delete cascade on update cascade
);



Create table event
(
    event_id varchar(50) not null,
    event_name varchar(25) not null,
    e_description varchar(50),
    start_date date,
    end_date date,
    status varchar(25),
    venue_id int,
    capacity int,
    no_of_participants int,
  --user_id varchar(50),
    primary key (event_id),
  --foreign key (user_id) references [user] (user_id) on update cascade on delete cascade,
    foreign key(venue_id) references venue(venue_id) on update cascade on delete cascade
);

Create table event_booking
(
    booking_id int not null,
    user_id varchar(50),
    event_id varchar(50),
    booking_sate date,
    status varchar(25),
    primary key (booking_id),
  --primary key(event_id,user_id),
    foreign key (user_id) references user (user_id) on update cascade on delete cascade,
    foreign key (event_id) references event (event_id) on update cascade on delete cascade
);

create table event_type
(
    type_id int not null,
    event_category varchar(25),
    primary key (type_id)
);


CREATE TABLE dining (
    dining_id varchar(50) not null,
    type varchar(25),
    capacity int,
    booking_time time,
    primary key (dining_id)
);

CREATE TABLE reservation (
    reservation_id varchar(50) unique not null, 
    reservation_date date,
    status varchar(25),
    no_of_ppl int,
    user_id varchar(50),
    dining_id varchar(50),
	--primary key(user_id,dining_id),
    foreign key (user_id) references member(user_id) on update cascade on delete cascade,
    foreign key (dining_id) references dining(dining_id) on update cascade on delete cascade
);

CREATE TABLE party (
    party_id varchar(50) not null, 
    user_id varchar(50) ,
    p_name varchar(50),
    venue_id int,
    start_date date,
    end_date date,
    no_of_attendees int,
    status varchar(25),

    primary key (party_id),
    foreign key (user_id) references member(user_id) on update cascade on delete cascade,
    foreign key (venue_id) references venue(venue_id) on update cascade on delete cascade
);

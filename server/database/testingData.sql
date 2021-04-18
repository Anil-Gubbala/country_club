-- test data

-- user (user_id, f_name, l_name, email_id, street, city, zip_code, password, is_admin, status)
insert into user values(0000000001, 'Esha', 'Sah', 'e.sah@g.com', 'Washington Street', 'San Jose', '95112', 'pass@1234$', 1, 'confirmed');
insert into user values(0000000002, 'John', 'Smith', 'j.smi@g.com', 'Saint James Street', 'San Jose', '95101', 'pass@1234$', 0,'cancelled');
insert into user values(0000000003, 'Melissa', 'Jones', 'mj@g.com', 'Cahill Street', 'San Jose', '95106', 'pass@1234$', 0, 'confirmed');
insert into user values(0000000004, 'Amit', 'Singh', 'am.singh@g.com', 'Almaden Blvd', 'San Jose', '95110', 'pass@1234$', 0, 'confirmed');
insert into user values(0000000005, 'Peter', 'Parker', 'spidey@g.com', 'North 6th Street', 'San Jose', '95112', 'pass@1234$', 0, 'confirmed');
insert into user values(0000000006, 'Radhika', 'Salins', 'rd.s@g.com', 'Julian Street', 'San Jose', '95110', 'pass@1234$', 0, 'confirmed');
insert into user values(0000000007, 'Monica', 'Rao', 'moni@g.com', 'Reed Street', 'San Jose', '95113', 'pass@1234$', 0, 'pending');
insert into user values(0000000008, 'Deam', 'Thomas', 'dean@g.com', 'North 6th Street', 'San Jose', '95112', 'pass@1234$', 0, 'pending');

-- status
insert into status values('confirmed');
insert into status values('pending');
insert into status values('cancelled');

-- member (user_id, membership_type, start_date, end_date)
insert into member values(0000000002, 'gold', '2019-05-01', '2020-04-30');
insert into member values(0000000003, 'gold', '2021-01-01', '2021-12-31');
insert into member values(0000000004, 'platinum', '2021-04-05', '2022-04-04');
insert into member values(0000000005, 'silver', '2020-10-17', '2021-10-16');
insert into member values(0000000006, 'platinum', '2021-04-17', '2022-04-16');
-- insert into member values(0000000007, 'gold', '2021-04-17', '2022-04-16');
-- insert into member values(0000000008, 'platinum', '2021-02-01', '2022-01-31');

-- membership_type
insert into membership_type values('gold');
insert into membership_type values('silver');
insert into membership_type values('platinum');

-- dependent (name, user_id, relationship)
insert into dependent values('Monica', 0000000002, 'spouse');
insert into dependent values('Steven', 0000000003, 'spouse');
insert into dependent values('Preti', 0000000004, 'spouse');
insert into dependent values('Aneesh', 0000000004, 'child');
insert into dependent values('Priya', 0000000004, 'child');
insert into dependent values('Jacob', 0000000006, 'spouse');
insert into dependent values('Steven', 0000000006, 'child');
insert into dependent values('Monica', 0000000006, 'child');
insert into dependent values('Jessica', 0000000006, 'child');
-- insert into dependent values('Abhay', 0000000007, 'parent');

-- relationship
insert into relationship values('spouse');
insert into relationship values('child');
insert into relationship values('parent');
insert into relationship values('sibling');
insert into relationship values('others');

-- venue (venue_id, venue_name, venue_type)
insert into venue values(0000000001, 'Basket Ball Court', 'sport');
insert into venue values(0000000002, 'Swimming Pool', 'sport');
insert into venue values(0000000003, 'The Glass Door', 'dining');
insert into venue values(0000000004, 'Club Cafe', 'dining');
insert into venue values(0000000005, 'Rose', 'ballroom');
insert into venue values(0000000006, 'Grande', 'ballroom');
insert into venue values(0000000007, 'Tenis Court', 'sport');
insert into venue values(0000000008, 'Recreation Center', 'sport');
insert into venue values(0000000009, 'Skyline', 'lounge');
insert into venue values(0000000010, 'Focus', 'workshop');
insert into venue values(0000000011, 'Garden', 'ground');
insert into venue values(0000000012, 'Kid Pool', 'sport');
insert into venue values(0000000013, 'Golf Course', 'sport');

-- venue_type
insert into venue_type values('sport');
insert into venue_type values('dining');
insert into venue_type values('ballroom');
insert into venue_type values('lounge');
insert into venue_type values('workshop');
insert into venue_type values('ground');

-- sports (sport_id, s_name, venue_id, start_time, end_time)
insert into sports values(0000000001, 'Basket Ball', 0000000001, '08:00:00','120:00:00');
insert into sports values(0000000002, 'Tennis', 0000000007, '08:00:00','20:00:00');
insert into sports values(0000000003, 'Table Tennis', 0000000008, '08:00:00','20:00:00');
insert into sports values(0000000004, 'Swimming', 0000000002, '08:00:00','20:00:00');
insert into sports values(0000000005, 'Swimming-kid', 0000000012, '08:00:00','18:00:00');
insert into sports values(0000000006, 'Billiard', 0000000008, '08:00:00','20:00:00');
insert into sports values(0000000007, 'Archery', 0000000011, '11:00:00','16:00:00');
insert into sports values(0000000008, 'Golf', 0000000013, '08:00:00','16:00:00');
insert into sports values(0000000009, 'Yoga', 0000000011, '08:00:00','11:00:00');

-- time_slot (ts_id, start_time, end_time)
insert into time_slot values(0000000001, '08:00:00','09:00:00');
insert into time_slot values(0000000002, '09:00:00','10:00:00');
insert into time_slot values(0000000003, '10:00:00','11:00:00');
insert into time_slot values(0000000004, '11:00:00','12:00:00');
insert into time_slot values(0000000005, '12:00:00','13:00:00');
insert into time_slot values(0000000006, '13:00:00','14:00:00');
insert into time_slot values(0000000007, '14:00:00','15:00:00');
insert into time_slot values(0000000008, '15:00:00','16:00:00');
insert into time_slot values(0000000009, '16:00:00','17:00:00');
insert into time_slot values(0000000010, '17:00:00','18:00:00');
insert into time_slot values(0000000011, '18:00:00','19:00:00');
insert into time_slot values(0000000012, '19:00:00','20:00:00');

-- sports_booking: will added when functionality is activated

-- event (event_id, event_name, e_description, start_date, end_date, status, venue_id, capacity, no_of_participants, organized_by)
insert into event values(0000000001, 'Part of Art', 'Art displays of local independent artists', '2021-05-01', '2021-05-02', 'confirmed', 0000000005, 50, 0, 0000000001);
insert into event values(0000000002, 'World on my Plate', 'Food festival and fair where foods across cultures would be offered', '2021-05-08', '2021-05-09', 'confirmed', 0000000011, 50, 0, 0000000001);
insert into event values(0000000003, 'Rise n shine', 'Seminar on holistic and mindful living', '2021-05-08', '2021-05-09', 'confirmed', 0000000005, 30, 0, 0000000001);

-- event_booking: will be added when functionality will be activated

-- dining (dining_id, type, venue_id, capacity, start_time, end_time)
insert into dining values(0000000001, 'breakfast', 0000000004, 20, '08:00:00','12:00:00');
insert into dining values(0000000002, 'lunch', 0000000003, 20, '13:00:00','16:00:00');
insert into dining values(0000000003, 'lunch', 0000000004, 20, '13:00:00','16:00:00');
insert into dining values(0000000004, 'diner', 0000000003, 20, '18:00:00','22:00:00');
insert into dining values(0000000005, 'diner', 0000000004, 20, '18:00:00','22:00:00');

-- reservation: will be added when functionality will be activated

-- party (party_id, hosted_by, p_name, hasted_at, start_date, end_date, no_of_attendees, status)
insert into party values(0000000001, 0000000004, '10th Anniversary', 0000000006, '2021-05-09', '2021-05-09', 40, 'confirmed')

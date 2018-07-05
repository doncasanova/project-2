INSERT into pref_type
  (name)
VALUES
  ('sports');
INSERT into  pref_type
  (name)
VALUES
  ('arts');


/*
    // sequelize does have datatype value TIMESTAMP. add this column aftr the User table is created.
    // created_dt: {
    //   type: TIMESTAMP,
    //   allowNull: false, 
    //   defaultValue: CURRENT_TIMESTAMP
    // }

    */

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('vikings', 'The best in mid-west', 'vikings', '/images/pref_imgs/vikings.png');
insert into lookup_events (event_name) VALUES 
('twins', 'The baseball team in twin cities', 'twins', '/images/pref_imgs/twins.png');

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('timberwolves', 'The best in mid-west', 'timberwolves', '/images/pref_imgs/wolves.png');
insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('wild', 'The team wild', 'wild', '/images/pref_imgs/wild.png');

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('united', 'The Team UNITED', 'united', '/images/pref_imgs/united.png');
insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('saints', 'The team Saints', 'saints', '/images/pref_imgs/saints.png');

insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('lynx', 'The team Lynx', 'lynx', '/images/pref_imgs/lynx.png');

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('gophers', 'The Team Gophers', 'gophers', '/images/pref_imgs/gophers.png');





insert into lookup_event
  (event_name)
VALUES
  ('timberwolves');

insert into lookup_event
  (event_name)
VALUES
  ('wild');

insert into lookup_event
  (event_name)
VALUES
  ('united');
insert into lookup_event
  (event_name)
VALUES
  ('saints');

insert into lookup_event
  (event_name)
VALUES
  ('lynx');
insert into lookup_event
  (event_name)
VALUES
  ('gophers');

-- lookup_event
insert into lookup_event (event_name) VALUES ('lynx');
insert into lookup_event (event_name) VALUES ('gophers');

INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 1);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 2);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 3);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 4);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 5);


        
create database events_db;
use events_db;


CREATE TABLE users (
  id int not null auto_increment,
  first_name varchar(25) not null,
  last_name varchar(25) not null,
  pref_type int 
  
  leepy boolean not null,
  primary key(id) 
  );

  CREATE TABLE pref_type (
    id int not null auto_increment,
    name varchar(50) not null,
    primary key(id)
    );
  
  
  
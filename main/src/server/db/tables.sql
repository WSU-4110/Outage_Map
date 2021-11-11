/* Copy and paste this schema into your MySQL Workbench */

create database outageMapV2;
use outageMapV2;

create table users(
	user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_email varchar(100) UNIQUE NOT NULL,
    user_password varchar(100) NOT NULL
    );


create table service_types(
    service_type varchar(50) unique not null
);
    
create table outages(
    outage_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_email varchar(100) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    service_name VARCHAR(50) NOT NULL,
    latitude DECIMAL(20,15) NOT NULL,
    longitude DECIMAL(20,15) NOT NULL,
    outage_description VARCHAR(250),
    outage_status VARCHAR(10) NOT NULL DEFAULT 'Open',
    date_created date NOT NULL,
    FOREIGN KEY(user_email)
	    REFERENCES users(user_email),
    FOREIGN KEY(service_type)
	    REFERENCES service_types(service_type)
);


INSERT INTO service_types values ('Internet');
INSERT INTO service_types values ('Streaming');
INSERT INTO service_types values ('Cable');
INSERT INTO service_types values ('Power');
INSERT INTO service_types values ('Gaming Platform');
INSERT INTO service_types values ('Website');


insert into outages (user_email, service_type, service_name, latitude,
longitude, outage_description, date_created) values ("test")

select * from service_types;
select * from outages;
select * from users;
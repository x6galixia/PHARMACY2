-- Create database
CREATE DATABASE PHARMACY;

-- Create table
CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(200) NOT NULL,
	username VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL,
	user_type VARCHAR(200) NOT NULL
);
-- Create table
CREATE TABLE inventory
(
    item_name VARCHAR(250) NOT NULL,
    brand VARCHAR(250) NOT NULL,
    manufacturer VARCHAR(250) NOT NULL,
    dosage VARCHAR(250) NOT NULL,
    expiration DATE NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (item_name, brand)
)
-- Inserting additional data into users table
INSERT INTO users (name, username, password, user_type)
VALUES 
	('Kim Galicia', 'milktea', '1234', 'pharmacist');

-- Inserting data into inventory table
INSERT INTO inventory (item_name, brand, manufacturer, dosage, expiration, quantity)
VALUES
	('Aspirin', 'Bayer', 'hotdog', '25 mg', '2024-12-31', 100),
	('Ibuprofen', 'Advil', 'hotdog', '25 mg', '2025-01-15', 200);
	
	CREATE TABLE request (
    rq_id SERIAL PRIMARY KEY,
    
    pt_name VARCHAR(250) NOT NULL,
    pt_age INT NOT NULL,
    pt_gender VARCHAR(6) NOT NULL,
    pt_contact VARCHAR(15) NOT NULL,
    pt_address VARCHAR(250) NOT NULL,
    pt_prescription BYTEA NOT NULL, -

    rp_name VARCHAR(250) NOT NULL,
    rp_age INT NOT NULL,
    rp_relationship VARCHAR(250) NOT NULL,
    rp_contact VARCHAR(15) NOT NULL, 
    rp_address VARCHAR(250) NOT NULL,
    rp_valid_id BYTEA NOT NULL
);

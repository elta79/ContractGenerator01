CREATE DATABASE contractgeneratordb;

CREATE TABLE patientinsurancebenefits(
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(50) CHECK (LENGTH(first_name) <=50) NOT NULL,
    last_name VARCHAR(50) CHECK (LENGTH(last_name) <= 50) NOT NULL,
    dob DATE NOT NULL,
    edd DATE NOT NULL,
    insurance_name VARCHAR(50) NOT NULL,
    eligibility_date DATE NOT NULL,
    first_visit_date DATE NOT NULL,
    deductible INT NOT NULL,
    coinsurance INT NOT NULL,
    copay INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
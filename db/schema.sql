DROP DATABASE IF EXISTS emp_traxDB;

CREATE DATABASE emp_traxDB;

USE emp_traxDB;

CREATE TABLE department (
    id INT NOT NULL auto_incremenet PRIMARY KEY,
    name VARCHAR(30),
);

CREATE TABLE role (
    id INT NOT NULL auto_incremenet PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL auto_incremenet PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id)
);
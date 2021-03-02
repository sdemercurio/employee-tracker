INSERT INTO department (name)
VALUES
('Sales'),
('Legal'),
('Engineering'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Sales Person', 75000, 1),
('Lead Engineer', 150000, 3),
('Software Engineer', 80000, 3),
('Accountant', 120000, 4),
('Legal Team Lead', 110000, 2),
('Lawyer', 120000, 2),
('Lead Engineer'130000, 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Jonathan', 'Fishman', 3, null),
('Michael', 'Gordon', 3, 2),
('Page', 'McConnell', 1, 3,)
('Trey', 'Anastasio', 1, null),
('Susan', 'Greenberg', 3, 1),
('Some', 'Person', 2, 1),
('Another', 'Female', 4, 2),
('Bob', 'Loblah', 2, null);


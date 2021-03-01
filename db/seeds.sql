INSERT INTO department (name)
VALUES
('Management'),
('Human Resources'),
('Purchasing'),
('Sales'),
('Customer Service'),
('Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
('General Manager', 120000, 1),
('Head of Human Resources', 80000, 2),
('Head of Purchasing', 75000, 3),
('Sales Rep', 60000, 4),
('Customer Service Rep', 40000, 5),
('Warhouse Employee', 40000, 6);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
('Mia', 'Wallace', 1, 1),
('Vincent', 'Vega', 2, 2),
('Winston', 'Wolf', 3, 3),
('Jules', 'Winnfield', 4, 4),
('Butch', 'Coolidge', 5, 5),
('Captain', 'Koons', 6, 6);


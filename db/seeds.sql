INSERT INTO department (department_name)
VALUES
('Management'),
('Human Resources'),
('Purchasing'),
('Sales'),
('Customer Service'),
('Warehouse');

INSERT INTO roles(title, salary, department_id)
VALUES
('General Manager', 120000, 1),
('Head of Human Resources', 80000, 2),
('Head of Purchasing', 75000, 3),
('Sales Rep', 60000, 4),
('Customer Service Rep', 40000, 5),
('Warhouse Employee', 40000, 6);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
('Mia', 'Wallace', 100),
('Vincent', 'Vega', 200),
('Winston', 'Wolf', 300),
('Jules', 'Winnfield', 400),
('Butch', 'Coolidge', 500),
('Captain', 'Koons', 600);


INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Lead', 100000.00, 1),
  ('Salesperson', 80000.00, 1),
  ('Lead Engineer', 150000.00, 2),
  ('Software Engineer', 120000.00, 2),
  ('Accountant', 125000.00, 3),
  ('Legal Team Lead', 250000.00, 4),
  ('Lawyer', 190000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Mike', 'Smith', 2, 1),
  ('Eva', 'Longoria', 3, NULL),
  ('Karen', 'Johnson', 4, 3),
  ('David', 'Lee', 5, 3),
  ('Sarah', 'Gomez', 6, NULL),
  ('Maggie', 'Chen', 7, 6);
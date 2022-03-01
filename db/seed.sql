INSERT INTO department (name)
VALUES  ('SERVICE'),
        ('SALES'),
        ('PARTS'),
        ('BODY SHOP');

INSERT INTO role (title,salary,department_id)
VALUES  ('Service Technicain', 35000, 1),
        ('Sales Representative', 50000, 2),
        ('Parts Advisor', 45000, 3),
        ('Body Technician', 40000, 4);


INSERT INTO employee (first_name,last_name, role_id, manager_id)
VALUES  ('Mario','Perez', 1, 1),
        ('Jayro','Perez' ,2 , 2),
        ('David','Griffin', 3, 3),
        ('Jouse','Tamayo', 4, 4);

-- INSERT INTO managers (manager_id, manager_name)
-- VALUES  ( 1, 'Darrell'),
--         (2, 'Wilson'),
--         (3, 'John'),
--         (4, 'Chris');

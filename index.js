const mysql = require('mysql2');
const inquirer = require ('inquirer');
const cTable = require ('console.table');

const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'student1*',
    database: 'employee_db'
    },
    console.log(`Connected to the courses_db database.`)
);

console.log('Welcome to Employee Tracker');



 const showIntro = () => {

    inquirer
        .prompt([
    {
        type: 'list',
        name: 'options',
        message: 'Which option will you like to choose below?',
        choices:['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department','Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
    }
])

    .then(answer => {

        switch (answer.options){
            case "View All Departments":
               return viewAllDepartments();
                break;

            case "View All Roles":
              return viewAllRoles();
                break;

            case "View All Employees":
               return viewAllEmployees();
                break;

            case "Add A Department":
                return addDepartment();
                break;

            case "Add A Role":
                return addRole();
            break;

            case "Add An Employee":
                return addEmployee();
    
            break;

            case "Update An Employee Role":
                return updateEmployeeRole();
    
            break;

            // case 'Search Manager':
            // // search manager fuction    
            // break;

            case 'Quit':
             return quit();

            break;

        }
    })

    .catch((err) => {
        console.log(err)
    });
}

showIntro()


    function viewAllDepartments()  { 
        db.query("SELECT * FROM department",(err, depts) => {
            err ? console.log(err) : console.table(depts)
        });
        
        return setTimeout(()  => showIntro(), 2000);
        
    };

    function viewAllRoles() { 
        db.query("SELECT * FROM role",(err, result) => {
            err ? console.log(err) : console.table(result)
        });

        return setTimeout(()  => showIntro(), 2000);
    };

    function viewAllEmployees()  { 
        db.query("SELECT * FROM employee",(err, result) => {
            err ? console.log(err) : console.table(result)
        });

        return setTimeout(()  => showIntro(), 2000);
    };

    function addDepartment() { 

    inquirer
     .prompt([
         {
            type: 'input',
            name: 'insertDepartment',
            message:'What is the department name?',
         },

     ])
     .then((answer) => {
        db.query("INSERT INTO department(name) VALUES(?)",answer.insertDepartment,(err, result) => {
            err ? console.log(err) : console.table(answer)
        });
        return setTimeout(()  => showIntro(), 2000);
     });
     
       
    };

    function addRole() { 

        db.query("SELECT id AS value, name FROM department",(err, depts) => {
            err ? console.log(err) : console.table(depts);   

        inquirer
         .prompt([
            {
                type: 'input',
                name: 'title',
                message:'Please add the Title of the role (ex. Service Technician)',
            },
            {
                type: 'input',
                name: 'salary',
                message:'Please add the Salary to this role',
            },
            {
                type: 'list',
                name: 'department_id',
                message:'Which department does this role belong to?',
                choices: depts,
            },
            
        ])
        
        .then((answer) => {
            db.query(`INSERT INTO role (title, salary, department_id) Values(?,?,?)`,[answer.title, answer.salary, answer.department_id],(err, result) => {
                err ? console.log(err) : console.table(answer)
                    return setTimeout(()  => showIntro(), 2000);
            });
        })
    })
}
       


  


function addEmployee() {
    db.query('SELECT * FROM role', (err, res) => {
        let emplTitleArray = [];
        let empTitleListArray = [];
        for (i = 0; i <res.length; i++) {
            const{id,title,} = res[i];
            let emplTitleObject = {
                id,title,
            };
            empTitleListArray.push(emplTitleObject);
            emplTitleArray .push(id); 
        }
        err ? console.log(err) : console.table(empTitleListArray)
    
   
    


    inquirer
     .prompt([
        {
            type: 'input',
            name: 'first_name',
            message:'Please Enter Your First Name:',
        },
        {
            type: 'input',
            name: 'last_name',
            message:'Please Enter Your Last Name:',
        },
        {
            type: 'list',
            name: 'role_id',
            message:'Please choose the id # for the role this employee belong to. Look at above table for id # of Title',
            choices: emplTitleArray,
           
        },
        {
          type: 'input',
        name: 'manager_id',
        message:'Please Enter this Employee managers ID', 
        },
        
    ])
    .then((answer) => {
        db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) Value(?,?,?,?)",[answer.first_name, answer.last_name, answer.role_id, answer.manager_id],(err, result) => {
            err ? console.log(err) : console.table(answer)
        })
        return setTimeout(()  => showIntro(), 2000);
    });
  
})
}

   

    function updateEmployeeRole() { 
        
        db.query('SELECT * FROM employee', (err, res) => {
            let emplArray = [];
            let employeeListArray= [];
            for (i = 0; i <res.length; i++) {
                const{id,first_name,last_name,role_id,} = res[i];
                let emplObject = {
                    id, first_name, last_name, role_id,
                };
                employeeListArray.push(emplObject);
                emplArray.push(id+ ' ' + first_name+ ' '+ last_name);
            }
            
            
            err ? console.log(err) : console.table(employeeListArray)

       
            
            
       


        db.query('SELECT * FROM role', (err, res) => {
            let numTitle = [];
            for (i = 0; i <res.length; i++) {
                const{id,title,} = res[i];

                numTitle.push(id+ ' ' + title);
            }
            
            
            err ? console.log(err) : console.table(numTitle)

    
        inquirer
         .prompt ([
            {
                type: 'list',
                name: 'id',
                message:'Which employee role would you like to update?',
                choices: emplArray,
            },
            {
                type: 'list',
                name: 'new_role_id',
                message:'Please choose the id # for new role of this employee?',
                choices: numTitle,
            },
        ])

        .then((answer) => {
            let ab = answer.id.split(" ")
            let cd = ab[0]

            let ef = answer.new_role_id.split(" ")
            let gh = ef[0]

            db.query("UPDATE employee SET role_id=? WHERE id=?",[gh , cd ],(err, result) => {
                err ? console.log(err) : console.table(answer)
            })
            return setTimeout(()  => showIntro(), 2000);
        });
    });
    })
    }

    function quit() { 
        console.log('Existing Program.....Good Bye'), process.exit(0);
    };
 

     
       
    
    

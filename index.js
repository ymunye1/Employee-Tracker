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
        choices:['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department',
         'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
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

            case "Update An Employee Role":
                //Update An Employee Role fuction here
    
            break;

            case 'Search Manager':
            // search manager fuction    
            break;

            case 'Quit':
             // add quit fuctiion

            break;

        }
    })

    .catch((err) => {
        console.log(err)
    });
}

showIntro()


    function viewAllDepartments()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
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
         }

     ])
     .then((answer) => {
        db.query("INSERT INTO department(name) VALUES(?)",answer.insertDepartment,(err, result) => {
            err ? console.log(err) : console.table(answer.insertDepartment, 'Has been added to Department')
        })
     })

       
    };

    function addRole() { 
        inquirer
         .prompt([
            {
                type: 'input',
                name: 'insertRole',
                message:'Please add the Title of the role (ex. Service Technician)',
            },
            {
                type: 'input',
                name: 'insertSalary',
                message:'Please add the Salary to this role',
            },
            {
                type: 'list',
                name: 'departments',
                message:'Which department would you like the roles added to?',
                choices:['SERVICE,SALES,PARTS,BODY SHOP'],
            },
            
        ])
        
        .then((answer) => {
            db.query("INSERT INTO role (title, salary) Values(?,?)",answer.insertRole,answer.insertSalary,(err, result) => {
                err ? console.log(err) : console.table(answer.insertRole,'has been added with',answer.insertSalary, 'salalry ', 'to',answer.department ,'Department')
            })
        });
    }
       


    function updateEmployeeRole() { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };


    // function searchManager()  { 
    //     db.query("SELECT * FROM department",(err, result) => {
    //         err ? console.log(err) : console.table(result)
    //     })
    // };

    function Quit() { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };
    

     
       
    
    

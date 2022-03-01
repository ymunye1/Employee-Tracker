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
            //All department fuction here

            break;

            case "View All Roles":
                //All roles fuction here
    
            break;

            case "View All Employees":
                //All Employess fuction here
    
            break;

            case "Add A Department":
                //add a department fuction here
    
            break;

            case "Add A Role":
                //Add A Role fuction here
    
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
    });

    function viewAllDepartments()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };

    function viewAllRoles()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };

    function viewAllEmployees()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };

    function addDepartment()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };

    function addRole()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };


    function updateEmployeeRole()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };


    // function searchManager()  { 
    //     db.query("SELECT * FROM department",(err, result) => {
    //         err ? console.log(err) : console.table(result)
    //     })
    // };

    function Quit()  { 
        db.query("SELECT * FROM department",(err, result) => {
            err ? console.log(err) : console.table(result)
        })
    };
    

     
       
    
    

// viewing all employees by manager

// Get sql statemtnts set first

// Nested inquirer stuff

//department:
// id - INT PRIMARY KEY
// name - VARCHAR(30) to hold department name

// role:
// id - INT PRIMARY KEY
// title - VARCHAR(30) to hold role title
// salary - DECIMAL to hold role salary
// department_id - INT to hold reference to department role belongs to

// employee:
// id - INT PRIMARY KEY
// first_name - VARCHAR(30) to hold employee first name
// last_name - VARCHAR(30) to hold employee last name
// role_id - INT to hold reference to role employee has
// manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
// Build a command-line application that at a minimum allows the user to:

// =============== requiring modules =====================
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// =============== establishing connection =====================

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sarah123',
    database: 'emp_traxDB',
});

connection.connect((err) => {
    if(err) {
        console.log(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

// =============== inquirer prompts =====================

// What would you like to do?

const init = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View All employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
        ],
    })
};


init();


// =============== functions =====================

// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

// =============== bonus =====================

// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
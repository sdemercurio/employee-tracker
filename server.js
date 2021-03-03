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
            'End',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
          case 'View All employees':
            viewAll();
            break;
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
          case "View Employees by Manager":
            viewEmployeeByManager();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employees":
            removeEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Add Role":
            addRole();
            break;
          case "Remove Employee":
            removeRole();
            break;
          case "Update Employee Manager":
            updateEmployeeManager();
            break;
  
          case "End":
            connection.end();
            break;
        }
      });
};

const viewAll = () => {
    const query =
      `SELECT 
      employee.id, 
      employee.first_name AS 'First Name', 
      employee.last_name AS 'Last Name', 
      role.title as Title, 
      role.salary AS Salary, 
      department.name AS Department, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
  FROM employee 
      JOIN role ON employee.role_id = role.id 
      JOIN department ON role.department_id = department.id 
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
  
    connection.query(query,(err, res) => {
      if (err) throw err;
  
      console.table(res);
      console.log("All employees!\n");
  
      init();
    });
  }

  const addEmployee = () => {
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
            'End',
        ],
    })
    const query =
    // `SELECT d.id, d.name, r.salary AS budget
    // FROM employee e
    // LEFT JOIN role r
    //   ON e.role_id = r.id
    // LEFT JOIN department d
    // ON d.id = r.department_id
    // GROUP BY d.id, d.name`
  
    connection.query(query,(err, res) => {
      if (err) throw err;
  
      console.table(res);
      console.log("All employees!\n");
  
      init();
    });
  }


init();


// =============== functions =====================

// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

// viewEmployeeByDepartment();
// I need first_name, last_name of employee table
// I need department.id which is referenced by role.department_id which is referenced by employee.role_id

// viewEmployeeByManager();
// SELECT 

// addEmployee();

// removeEmployee();

// updateEmployeeRole();

// addRole();

// removeRole();

// updateEmployeeManager();

// =============== bonus =====================

// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
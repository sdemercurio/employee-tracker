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
  if (err) {
    console.log(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// =============== inquirer prompts =====================

// What would you like to do?

const init = () => {
  inquirer.prompt([
    {
      message: "What would you like to do?",
      type: "list",
      name: "action",
      choices: [
        'View all employees',
        'View roles',
        'View departments',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee role',
        'exit']
    }

  ]).then((response) => {
    if (response.action === 'View all employees') {
      viewAll();
    }
    else if (response.action === 'Add department') {
      addDepartment();
    }
    else if (response.action === 'View roles') {
      viewRoles();
    }
    else if (response.action === 'View departments') {
      viewDepartments();
    }
    else if (response.action === 'Add employee') {
      addEmployee();
    }
    else if (response.action === 'Add role') {
      addRole();
    }
    else if (response.action === 'Update employee role') {
      updateEmployeeRole();
    }
    else {
      connection.end();
      return;
    }
  });
}

const addDepartment = () => {
  inquirer.prompt([
    {
      message: "What is the department's name?",
      type: "input",
      name: "departmentName"
    }
  ]).then((response) => {
    connection.query("INSERT INTO departments (name) VALUES (?)", response.departmentName, (err, result) => {
      console.log("Success!");
      init();
    });
  });
}

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

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    console.log("All employees!\n");

    init();
  });
};

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

// =============== requiring modules =====================
const empTrax = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
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

// =============== Fancy Title =====================

empTrax
  .command('init')

  .description('Draw app banner')

  .action(() => {
    console.log(chalk.blueBright(figlet.textSync('EmpTrax', { horizontalLayout: 'full' })
    )
    );
  });

empTrax.parse(process.argv);

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

// =============== Functions =====================

// add department

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: 'Please enter a name for the department you wish to add: '
    }
  ])
    .then((data) => {
      const query = connection.query(`INSERT INTO department SET ?`,
        {
          name: data.departmentName
        },
        (err, res) => {
          if (err) throw err;
          console.log('Department added successfully!');
          init();
        }
      )
      console.log(query.sql);
    });
}

// view all employees, departments, roles, salary, manager_id, department_id

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

// view departments

const viewDepartments = () => {
  connection.query("SELECT * FROM department",
    (err, results) => {
      if (err) throw err;

      const table = cTable.getTable("Department", results);

      console.table(table);
      init();
    });
};

// view roles

const viewRoles = () => {
  connection.query("SELECT * FROM role",
    (err, results) => {
      if (err) throw err;

      const table = cTable.getTable("Roles", results);

      console.table(table);
      init();

    })
};

// add employee

const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, roles) => {
    if (err) throw err;

    connection.query("SELECT * FROM employee", (err, employee) => {
      if (err) throw err;

      const managers = employee.filter(employee => {
        let roleId;

        roles.forEach(role => {
          if (role.title.toLowerCase() === "manager")
            roleId = role.id;
        });

        if (employee.role_id === roleId) {
          return employee;
        }
      });

      managers.push({ id: null, first_name: "null", last_name: "null", manager_id: null });

      inquirer.prompt([
        {
          message: "Please enter a first name",
          type: "input",
          name: "firstName"
        },
        {
          message: "Please enter a last name",
          type: "input",
          name: "lastName"
        },
        {
          message: "Please choose a role",
          type: "list",
          name: "role_id",
          choices: roles.map(role => {
            return {
              name: role.title,
              value: role.id
            }
          })
        },
        {
          message: "Please choose a manager",
          type: "list",
          name: "manager_id",
          choices: managers.map(manager => {
            return {
              name: manager.first_name + " " + manager.last_name,
              value: manager.id
            }
          })
        }
      ])
        .then((data) => {
          let eRole;
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].title === data.role) {
              eRole = roles[i].id;
            }
          }

          let eManager;
          for (let i = 0; i < choices.length; i++) {
            if (managers[i].title === data.manager) {
              eManager = managers[i].id;

              const query = connection.query(`INSERT INTO employee SET ?`,
                {
                  name: data.firstName,
                  name: data.lastName,
                  name: data.eRole,
                  name: data.eManager
                },
                (err, res) => {
                  if (err) throw err;
                  console.log('Employee added successfully!');
                  init();
                }
              )
              console.log(query.sql);

            }
          }

        });
    })

  });
};

// add role

const addRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;

    inquirer.prompt([
      {
        message: 'What is the title of new role?',
        type: 'input',
        name: 'title'
      },
      {
        message: "Please enter salary: ",
        type: "input",
        name: "salary",
        validate: (value) => {
          return !isNaN(value) ? true : "Please provide a number value.";
        }
      },
      {
        message: "Which department does this role belong to?",
        type: "list",
        name: "department",
        choices: [
          'Sales',
          'Legal',
          'Engineering',
          'Finance',
        ], 
        }
    ]).then((response) => {
        connection.query("INSERT INTO role SET ?", 
        {
          title: response.title, 
          salary: response.salary, 
          department_id: response.department_id
        }, 
        (err) => {
          if (err) throw err;
          console.log("Success!");
          init();
        });
      });
  });
};

init();

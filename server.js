//Dependencies found here
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");

const dbConnection = mysql.createConnection({
    server: "localhost",
    port: 3000,
    username: "admin",
    password: "Yonkers24!",
    database: "employeesDB"
  });
  
  dbConnection.connect(function(error) {
    if (error) throw error;
    console.log("Connected to the database as ID " + dbConnection.threadId);
  
    displayStartScreen();
  });
  
  function displayStartScreen() {
    inquirer.prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        { name: "Create new department", value: createDepartment },
        { name: "Create new role", value: createRole },
        { name: "Add new employee", value: addEmployee },
        { name: "View departments", value: viewDepartments },
        { name: "View roles", value: viewRoles },
        { name: "View employees", value: viewEmployees },
        { name: "Update employee role", value: updateEmployeeRole },
        { name: "Exit", value: exitProgram }
      ]
    }).then(handleOption);
  }
  
  function handleOption(result) {
    console.log("Selected option: " + result.option);
    result.option();
  }
  
  function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the name of the department:",
        name: "deptName"
      })
      .then(function(answer) {
        connection.query(
          "INSERT INTO department (name) VALUES (?)",
          [answer.deptName],
          function(err, res) {
            if (err) throw err;
            console.table(res);
            displayStartScreen();
          }
        );
      });
  }
  
  function addRole() {
    inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the role:"
      },
      {
        type: "input",
        name: "salaryTotal",
        message: "Enter the salary for this role:"
      },
      {
        type: "input",
        name: "deptID",
        message: "Enter the department ID number:"
      }
    ])
    .then(handleRoleInput);
  }
  
  function handleRoleInput(answer) {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [answer.roleName, answer.salaryTotal, answer.deptID],
      function(err, res) {
        if (err) throw err;
        console.table(res);
        displayStartScreen();
      }
    );
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the first name of the employee:",
          name: "FirstName"
        },
        {
          type: "input",
          message: "Enter the last name of the employee:",
          name: "LastName"
        },
        {
          type: "input",
          message: "Enter the employee's role ID number:",
          name: "roleID"
        },
        {
          type: "input",
          message: "Enter the manager ID number:",
          name: "managerID"
        }
      ])
      .then(handleEmployeeInput);
  }
  
  function handleEmployeeInput(answer) {
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID],
      function(err, res) {
        if (err) throw err;
        console.table(res);
        displayStartScreen();
      }
    );
  }
  

  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "eeUpdate"
        },
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(handleUpdateEmployeeInput);
  }
  
  function handleUpdateEmployeeInput(answer) {
    connection.query(
      "UPDATE employee SET role_id = ? WHERE first_name = ?",
      [answer.updateRole, answer.eeUpdate],
      function(err, res) {
        if (err) throw err;
        console.table(res);
        displayStartScreen();
      }
    );
  }
  
  function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      displayStartScreen();
    });
  }

  function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      displayStartScreen();
    });
  }
  function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      displayStartScreen();
    });
  }
  function quit() {
    connection.end();
    process.exit();
  }
  
  
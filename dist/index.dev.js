"use strict";

//Dependencies
var inquirer = require("inquirer");

var mysql = require("mysql"); // Create connection to database


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Morpheus718",
  database: "employee_info_db"
}); // Connect to database and call startScreen() to display options to user

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startScreen();
}); // Displays options to user and calls corresponding function based on their selection

function startScreen() {
  inquirer.prompt({
    type: "list",
    choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role", "Quit"],
    message: "What would you like to do?",
    name: "option"
  }).then(function (result) {
    console.log("You entered: " + result.option);

    switch (result.option) {
      case "Add department":
        addDepartment();
        break;

      case "Add role":
        addRole();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "View departments":
        viewTable("department");
        break;

      case "View roles":
        viewTable("role");
        break;

      case "View employees":
        viewTable("employee");
        break;

      case "Update employee role":
        updateEmployee();
        break;

      default:
        quit();
    }
  });
} // Adds a department to the database


function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "What is the name of the department?",
    name: "deptName"
  }).then(function (answer) {
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
} // Adds a role to the database


function addRole() {
  inquirer.prompt([{
    type: "input",
    message: "What's the name of the role?",
    name: "roleName"
  }, {
    type: "input",
    message: "What is the salary for this role?",
    name: "salaryTotal"
  }, {
    type: "input",
    message: "What is the department id number?",
    name: "deptID"
  }]).then(function (answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
} // Adds an employee to the database


function addEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "What's the first name of the employee?",
    name: "eeFirstName"
  }, {
    type: "input",
    message: "What's the last name of the employee?",
    name: "eeLastName"
  }, {
    type: "input",
    message: "What is the employee's role id number?",
    name: "roleID"
  }, {
    type: "input",
    message: "What is the id number of the employee's manager?",
    name: "managerID"
  }]).then(function (answer) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function (err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
} // Displays table based on user selection


function viewTable(table) {
  connection.query("SELECT * FROM " + table, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
} // Updates an employee's role in the database


function updateEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "What is the id number of the employee you want to update?",
    name: "eeID"
  }, {
    type: "input",
    message: "What is the id number of the new role?",
    name: "newRoleID"
  }]).then(function (answer) {
    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.newRoleID, answer.eeID], function (err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
} // Ends the database connection


function quit() {
  console.log("Goodbye!");
  connection.end();
}
//# sourceMappingURL=index.dev.js.map

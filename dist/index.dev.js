"use strict";

//Dependencies found here
var inquirer = require("inquirer");

var mysql = require("mysql");

var cTable = require("console.table");

var db = require(".");

var dbConnection = mysql.createConnection({
  server: "localhost",
  port: 3001,
  username: "admin",
  password: "Yonkers24!",
  database: "employee_db"
});
dbConnection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to the database as ID " + dbConnection.threadId);
  displayStartScreen();
});

function displayStartScreen() {
  inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [{
      name: "Create new department",
      value: createDepartment
    }, {
      name: "Create new role",
      value: createRole
    }, {
      name: "Add new employee",
      value: addEmployee
    }, {
      name: "View departments",
      value: viewDepartments
    }, {
      name: "View roles",
      value: viewRoles
    }, {
      name: "View employees",
      value: viewEmployees
    }, {
      name: "Update employee role",
      value: updateEmployeeRole
    }, {
      name: "Exit",
      value: exitProgram
    }]
  }).then(handleOption);
}

function handleOption(result) {
  console.log("Selected option: " + result.option);
  result.option();
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "Enter the name of the department:",
    name: "deptName"
  }).then(function (answer) {
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
      if (err) throw err;
      console.table(res);
      displayStartScreen();
    });
  });
}
//# sourceMappingURL=index.dev.js.map

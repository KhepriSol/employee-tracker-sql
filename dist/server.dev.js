"use strict";

var inquirer = require("inquirer"),
    mysql = require("mysql"),
    cTable = require("console.table"),
    db = require(".");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "employeesDB"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startScreen();
});

var startScreen = function startScreen() {
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
        viewDepartment();
        break;

      case "View roles":
        viewRoles();
        break;

      case "View employees":
        viewEmployees();
        break;

      case "Update employee role":
        updateEmployee();
        break;

      default:
        quit();
    }
  });
};

var addDepartment = function addDepartment() {
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
};

var addRole = function addRole() {
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
}; // Function to add employee


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
    message: "What is the manager id number?",
    name: "managerID"
  }]).then(function (answer) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function (err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
} // Function to update employee


function updateEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "Which employee would you like to update?",
    name: "eeUpdate"
  }, {
    type: "input",
    message: "What do you want to update to?",
    name: "updateRole"
  }]).then(function (answer) {
    connection.query("UPDATE employee SET role_id=? WHERE first_name= ?", [answer.updateRole, answer.eeUpdate], function (err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
} // Function to view department


function viewDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
} // Function to view roles


function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
} // Function to view employees


function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
} // Function to quit


function quit() {
  connection.end();
  process.exit();
}
//# sourceMappingURL=server.dev.js.map

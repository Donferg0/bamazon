var inquirer = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    table();
});

var table = function() {
    connection.query("SELECT *  FROM products", function(err, res) {
        if (err) throw err
        for  (var i = 0; i < res.length; i++) {
            console.log(res[i].product + " || " + res[i].department + " || " + res[i].price + "\n")
        }
    })
}

var purchase = function() {
    inquirer.prompt([{
        type: 'input',
        name: "choice",
        message: "What can I help you with today?"
    }]).then(function(answer) {
        
    })
}
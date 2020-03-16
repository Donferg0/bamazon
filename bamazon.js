var inquirer = require('inquirer');

var mysql = require('mysql');

var Table = require("cli-table");

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

var table = function(){
    connection.query("SELECT * FROM products", function(err, res) {
		if(err) throw err;
		var makeTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
		});
		for(var i = 0; i < res.length; i++){
			makeTable.push(
				[res[i].id,res[i].product, res[i].department, res[i].price, res[i].quantity]
				);
		}
		console.log(makeTable.toString());
		purchase(res);
	});
}

var purchase = function(res) {
    inquirer.prompt([
        {
            type: 'input',
            name: "choice",
            message: "What would you like to purchase today? [Quit with Q]",
        },
        {
            type: 'input',
            name: 'amount',
            message: "How many would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false
                }
            }

        }]).then(function(answer) {
            var correct = false;
            for(var i = 0; i < res.length; i++){
                if(res[i].product == answer.choice){
                    correct = true;
                    var product = answer.choice;
                    var id = i;
                }
            }
            
    })
}


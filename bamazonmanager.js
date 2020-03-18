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
		manager(res);
	});
}

var manager = function(res) {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add new item", "Add quantity to an existing item"]
    }]).then(function(val) {
        if(val.choice === "Add new item"){
            addItem();
        }
        if(val.choice === "Add quantity to an existing item") {
            addQuantity(res);
        }
    })
}

function addItem() {
    inquirer.prompt([{
        type: "input",
        name: "productname",
        message: "What is the name of the product?"
    }, {
        type: "input",
        name: "departmentname",
        message: "What is the department?"
    }, {        
        type: "input",
        name: "price",
        message: "Enter price"
    }, {
        type: "input",
        name: "quantity",
        message: "How many are available?"
    }]).then(function(val){
        connection.query("INSERT INTO products (product,department,price,quantity) VALUES ('" + val.productname + "', '" + val.departmentname + "', " + val.price + ", " + val.quantity + ");", function(err, res) {
            if(err)throw err;
            console.log(val.productname + "ITEM HAS BEEN ADDED!");
            table();
        })
    })
}

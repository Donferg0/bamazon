CREATE DATABASE  bamazon_db;

USE bamazon_db;

CREATE  TABLE products (
    id INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT(10) NOT NULL
)
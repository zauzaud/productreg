CREATE DATABASE sitegrupo;

USE sitegrupo;

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(255) NOT NULL,
    data DATE NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    pedido_id INT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

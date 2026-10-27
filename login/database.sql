CREATE DATABASE CR7GOAT;
USE CR7GOAT;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);

INSERT INTO usuario (email, senha, tipo)
VALUES ('murilorohohmann@gmail.com', 'hohmann', 'admin');

SELECT * FROM usuario

ALTER USER 'root'@'localhost' IDENTIFIED BY 'suasenha123';
ALTER USER 'root'@'%' IDENTIFIED BY 'suasenha123';
FLUSH PRIVILEGES;
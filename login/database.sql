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

SELECT * FROM usuario;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'suasenha123';
ALTER USER 'root'@'%' IDENTIFIED BY 'suasenha123';
FLUSH PRIVILEGES;

-- Tabela de produtos do almoxarifado
CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de movimentações (histórico de entradas e saídas)
CREATE TABLE IF NOT EXISTS movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Inserir alguns produtos de exemplo para aparecerem no teu app
INSERT INTO produto (nome, descricao, quantidade, categoria) VALUES 
('Chave de Fenda', 'Ferramenta manual de fenda', 18, 'Ferramentas'),
('Multímetro', 'Multímetro digital profissional', 5, 'Equipamentos');

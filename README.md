# 📚 44Books — Backend

Sistema simples de gerenciamento de livros e autores, desenvolvido como atividade escolar 
---

##  Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

##  Execução do backend

Acesse a pasta do backend:
backend

Instale as dependências:
npm install

Inicie o servidor:
npm run dev

 A API estará disponível em:
 http://localhost:8000

## Estrutura das rotas

 /livros
GET	Retorna todos os livros
POST	Cadastra um novo livro
PUT	Atualiza um livro
DELETE	Remove um livro

 /autores
GET	Retorna todos os autores
POST	Cadastra um novo autor
PUT	Atualiza um autor
DELETE	Remove autor e seus livros

 ## Banco de Dados

Execute os comandos abaixo no seu MySQL:

 ```sql
CREATE DATABASE IF NOT EXISTS books44;
USE books44;

CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  imagemUrl VARCHAR(5000),
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50)
);

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  preco DECIMAL(10,2),
  genero VARCHAR(50),
  ano_publicacao INT,
  autor_id INT,
  imagemUrl VARCHAR(10000),
  FOREIGN KEY (autor_id) REFERENCES autores(id)
);

-- Inserção de autores
INSERT INTO autores (id, imagemUrl, nome, nacionalidade) VALUES
(1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Frank_Herbert_1984_%28square%29.jpg/250px-Frank_Herbert_1984_%28square%29.jpg', 'Frank Herbert', 'Estadunidense'),
(2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg/250px-Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg', 'George R. R. Martin', 'Estadunidense');

-- Inserção de livros
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id, imagemUrl) VALUES
(1, 'Duna', 80.00, 'Ficção', 1965, 1, 'https://m.media-amazon.com/images/I/41MRn6hy8-L._SY445_SX342_.jpg'),
(2, 'Fogo & Sangue', 95.00, 'Ficção', 2018, 2, 'https://m.media-amazon.com/images/I/818yNY0mMZL._UF1000,1000_QL80_.jpg');
```

 ## Desenvolvido por Victoria 1023A

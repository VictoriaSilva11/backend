#  Backend - 44Books 

Este é o backend da aplicação **44Books**, uma livraria fictícia com CRUD completo para autores e livros, desenvolvido com **Fastify** e **MySQL**.

##  Tecnologias
- Fastify (framework leve e rápido para Node.js)
- MySQL (banco de dados relacional)
- TypeScript
- @fastify/cors
- mysql2 (driver para Node.js)

##  Configuração do Banco de Dados

```sql
CREATE DATABASE books44;

USE books44;

CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  nacionalidade VARCHAR(100),
  imagemUrl TEXT
);

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  preco DECIMAL(10, 2),
  genero VARCHAR(50),
  ano_publicacao INT,
  imagemUrl TEXT,
  autor_id INT,
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE
);
```

##  Endpoints da API

### Autores
- `GET /autores` → Lista todos os autores
- `POST /autores` → Adiciona novo autor
- `PUT /autores/:id` → Atualiza um autor
- `DELETE /autores/:id` → Remove autor e seus livros associados

### Livros
- `GET /livros` → Lista todos os livros (com nome do autor)
- `POST /livros` → Adiciona novo livro
- `PUT /livros/:id` → Atualiza um livro
- `DELETE /livros/:id` → Remove um livro

##  CORS
Permissões abertas para requisições de qualquer origem:

```ts
fastify.register(cors, {
  origin: '*',
  methods: ['POST', 'GET', 'DELETE', 'PUT']
});
```

##  Inicialização

1. Instale as dependências:
```bash
npm install
npm install fastify @fastify/cors mysql2 typescript ts-node-dev
```

2. rode o servidor com:
```bash
npm run dev
```

3. Acesse: [http://localhost:8000](http://localhost:8000)

##  Desenvolvedora
**Victória de Almeida Silva**  
Este backend foi criado para gerenciar os dados da aplicação da livraria **44Books**.
---

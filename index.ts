import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import mysql from 'mysql2/promise';

const app = fastify();
app.register(cors, { origin: '*', 
  methods: ['POST', 'GET', 'DELETE', 'PUT']
});

// Função para criar conexão
async function criarConexao() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books44'
  });
}

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ mensagem: "API 44Books - Backend" });
});

app.get('/relatorio', async (req: FastifyRequest, reply: FastifyReply) => {
  let conn;
  try {
    conn = await criarConexao();
    const [rows] = await conn.query(`
      SELECT l.*, a.nome as autor_nome, a.nacionalidade 
      FROM livros l
      JOIN autores a ON l.autor_id = a.id
    `);
    reply.send(rows);
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao buscar livros' });
  } finally {
    if (conn) await conn.end();
  }
});

app.post('/livros', async (req: FastifyRequest, reply: FastifyReply) => {
  const { titulo, preco, genero, ano_publicacao, autor_id } = req.body as any;
  let conn;
  
  if (!titulo || !autor_id) {
    return reply.status(400).send({ erro: 'Título e autor são obrigatórios' });
  }

  try {
    conn = await criarConexao();
    const [result] = await conn.query(
      `INSERT INTO livros 
      (titulo, preco, genero, ano_publicacao, autor_id) 
      VALUES (?, ?, ?, ?, ?)`,
      [titulo, preco, genero, ano_publicacao, autor_id]
    );
    reply.status(201).send({ id: (result as any).insertId });
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao criar livro' });
  } finally {
    if (conn) await conn.end();
  }
});

// Rotas para Autores
app.get('/autores', async (req: FastifyRequest, reply: FastifyReply) => {
  let conn;
  try {
    conn = await criarConexao();
    const [rows] = await conn.query('SELECT * FROM autores');
    reply.send(rows);
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao buscar autores' });
  } finally {
    if (conn) await conn.end();
  }
});

// Relatório com INNER JOIN
app.get('/relatorio', async (req: FastifyRequest, reply: FastifyReply) => {
  let conn;
  try {
    conn = await criarConexao();
    const [rows] = await conn.query(`
      SELECT 
        l.id, 
        l.titulo, 
        l.preco,
        l.genero,
        l.ano_publicacao,
        a.nome AS autor, 
        a.nacionalidade
      FROM livros l
      INNER JOIN autores a ON l.autor_id = a.id
      ORDER BY l.titulo
    `);
    reply.send(rows);
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao gerar relatório' });
  } finally {
    if (conn) await conn.end();
  }
});

// Iniciar servidor
const start = async () => {
  try {
    await app.listen({ port: 8000 });
    console.log('Servidor rodando em http://localhost:8000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

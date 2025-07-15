import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import mysql from 'mysql2/promise';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
  methods: ['POST', 'GET', 'DELETE', 'PUT']
});

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'books44'
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// Rota inicial
fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ mensagem: "API 44Books - Backend" });
});

// Relatório com INNER JOIN
fastify.get('/relatorio', async (request: FastifyRequest, reply: FastifyReply) => {
  let conn;
  try {
    conn = await getConnection();
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
      ORDER BY l.id
    `);
    reply.send(rows);
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao gerar relatório' });
  } finally {
    if (conn) await conn.end();
  }
});

// ROTAS AUTORES
fastify.get('/autores', async () => {
  const conn = await getConnection();
  const [rows] = await conn.query('SELECT * FROM autores');
  await conn.end();
  return rows;
});

fastify.post('/autores', async (request, reply) => {
  const { nome, nacionalidade } = request.body as { nome: string; nacionalidade: string };
  const conn = await getConnection();
  await conn.query('INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)', [nome, nacionalidade]);
  await conn.end();
  return { message: 'Autor criado com sucesso' };
});

fastify.put('/autores/:id', async (request, reply) => {
  const id = Number((request.params as any).id);
  const { nome, nacionalidade } = request.body as { nome: string; nacionalidade: string };
  const conn = await getConnection();
  await conn.query('UPDATE autores SET nome = ?, nacionalidade = ? WHERE id = ?', [nome, nacionalidade, id]);
  await conn.end();
  return { message: 'Autor atualizado com sucesso' };
});

fastify.delete('/autores/:id', async (request, reply) => {
  const id = Number((request.params as any).id);
  const conn = await getConnection();
  await conn.query('DELETE FROM livros WHERE autor_id = ?', [id]);
  await conn.query('DELETE FROM autores WHERE id = ?', [id]);
  await conn.end();
  return { message: 'Autor e seus livros deletados com sucesso' };
});

// ROTAS LIVROS
fastify.get('/livros', async () => {
  const conn = await getConnection();
  const [rows] = await conn.query(`
    SELECT livros.*, autores.nome AS autor 
    FROM livros 
    LEFT JOIN autores ON livros.autor_id = autores.id
  `);
  await conn.end();
  return rows;
});

fastify.post('/livros', async (request, reply) => {
  const { titulo, preco, genero, ano_publicacao, autor_id } = request.body as {
    titulo: string;
    preco: number;
    genero: string;
    ano_publicacao: number;
    autor_id: number;
  };
  const conn = await getConnection();
  await conn.query(
    'INSERT INTO livros (titulo, preco, genero, ano_publicacao, autor_id) VALUES (?, ?, ?, ?, ?)',
    [titulo, preco, genero, ano_publicacao, autor_id]
  );
  await conn.end();
  return { message: 'Livro criado com sucesso' };
});

fastify.put('/livros/:id', async (request, reply) => {
  const id = Number((request.params as any).id);
  const { titulo, preco, genero, ano_publicacao, autor_id } = request.body as {
    titulo: string;
    preco: number;
    genero: string;
    ano_publicacao: number;
    autor_id: number;
  };
  const conn = await getConnection();
  await conn.query(
    'UPDATE livros SET titulo = ?, preco = ?, genero = ?, ano_publicacao = ?, autor_id = ? WHERE id = ?',
    [titulo, preco, genero, ano_publicacao, autor_id, id]
  );
  await conn.end();
  return { message: 'Livro atualizado com sucesso' };
});

fastify.delete('/livros/:id', async (request, reply) => {
  const id = Number((request.params as any).id);
  const conn = await getConnection();
  await conn.query('DELETE FROM livros WHERE id = ?', [id]);
  await conn.end();
  return { message: 'Livro deletado com sucesso' };
});

// Iniciar servidor
const start = async () => {
  try {
    await fastify.listen({ port: 8000 });
    console.log('Servidor rodando em http://localhost:8000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

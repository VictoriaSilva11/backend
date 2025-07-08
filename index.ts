
import mysql from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors);

// Conexão com o banco books44
async function criarConexao() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "books44",
    port: 3306
  });
}

// Rotas para Livros
app.get('/livros', async (request: FastifyRequest, reply: FastifyReply) => {
  const { 
    genero, 
    autor, 
    ano_min, 
    ano_max, 
    preco_max,
    nacionalidade 
  } = request.query as any;
  
  let conn;
  try {
    conn = await criarConexao();

    let sql = `
      SELECT l.id, l.titulo, l.preco, l.genero, l.ano_publicacao,
             a.nome AS autor, a.nacionalidade
      FROM livros l
      INNER JOIN autores a ON l.autor_id = a.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (genero) {
      sql += " AND l.genero = ?";
      params.push(genero);
    }
    if (autor) {
      sql += " AND a.nome LIKE ?";
      params.push(`%${autor}%`);
    }
    if (ano_min) {
      sql += " AND l.ano_publicacao >= ?";
      params.push(ano_min);
    }
    if (ano_max) {
      sql += " AND l.ano_publicacao <= ?";
      params.push(ano_max);
    }
    if (preco_max) {
      sql += " AND l.preco <= ?";
      params.push(preco_max);
    }
    if (nacionalidade) {
      sql += " AND a.nacionalidade = ?";
      params.push(nacionalidade);
    }

    const [rows] = await conn.query(sql, params);
    reply.status(200).send(rows);
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.get('/livros/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  let conn;
  try {
    conn = await criarConexao();
    const [rows] = await conn.query(
      `SELECT l.*, a.nome AS autor, a.nacionalidade 
       FROM livros l
       INNER JOIN autores a ON l.autor_id = a.id
       WHERE l.id = ?`, 
      [id]
    );
    
    if ((rows as any).length === 0) {
      return reply.status(404).send({ mensagem: "Livro não encontrado" });
    }
    
    reply.status(200).send((rows as any)[0]);
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.post('/livros', async (request: FastifyRequest, reply: FastifyReply) => {
  const { titulo, preco, genero, ano_publicacao, autor_id } = request.body as any;
  let conn;

  if (!titulo || preco == null || !genero || !ano_publicacao || !autor_id) {
    return reply.status(400).send({ 
      mensagem: "Campos obrigatórios: titulo, preco, genero, ano_publicacao, autor_id" 
    });
  }

  try {
    conn = await criarConexao();

    // Verifica se o autor existe
    const [autor] = await conn.query("SELECT id FROM autores WHERE id = ?", [autor_id]);
    if ((autor as any).length === 0) {
      return reply.status(400).send({ mensagem: "Autor não encontrado" });
    }

    const [result] = await conn.query(
      `INSERT INTO livros (titulo, preco, genero, ano_publicacao, autor_id)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, preco, genero, ano_publicacao, autor_id]
    );

    reply.status(201).send({ 
      id: (result as any).insertId, 
      titulo, 
      preco, 
      genero, 
      ano_publicacao,
      autor_id
    });
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.put('/livros/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  const { titulo, preco, genero, ano_publicacao, autor_id } = request.body as any;
  let conn;

  if (!titulo && preco == null && !genero && !ano_publicacao && !autor_id) {
    return reply.status(400).send({ mensagem: "Informe pelo menos um campo para atualizar" });
  }

  try {
    conn = await criarConexao();

    // Verifica se o livro existe
    const [livro] = await conn.query("SELECT id FROM livros WHERE id = ?", [id]);
    if ((livro as any).length === 0) {
      return reply.status(404).send({ mensagem: "Livro não encontrado" });
    }

    // Verifica se o novo autor existe (se foi fornecido)
    if (autor_id) {
      const [autor] = await conn.query("SELECT id FROM autores WHERE id = ?", [autor_id]);
      if ((autor as any).length === 0) {
        return reply.status(400).send({ mensagem: "Autor não encontrado" });
      }
    }

    const campos: string[] = [];
    const valores: any[] = [];

    if (titulo) {
      campos.push("titulo = ?");
      valores.push(titulo);
    }
    if (preco != null) {
      campos.push("preco = ?");
      valores.push(preco);
    }
    if (genero) {
      campos.push("genero = ?");
      valores.push(genero);
    }
    if (ano_publicacao) {
      campos.push("ano_publicacao = ?");
      valores.push(ano_publicacao);
    }
    if (autor_id) {
      campos.push("autor_id = ?");
      valores.push(autor_id);
    }

    valores.push(id);
    const sql = `UPDATE livros SET ${campos.join(", ")} WHERE id = ?`;
    await conn.query(sql, valores);

    reply.status(200).send({ mensagem: "Livro atualizado com sucesso" });
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.delete('/livros/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  let conn;

  try {
    conn = await criarConexao();
    
    // Verifica se o livro existe
    const [livro] = await conn.query("SELECT id FROM livros WHERE id = ?", [id]);
    if ((livro as any).length === 0) {
      return reply.status(404).send({ mensagem: "Livro não encontrado" });
    }

    await conn.query("DELETE FROM livros WHERE id = ?", [id]);
    reply.status(200).send({ mensagem: "Livro removido com sucesso" });
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

// Rotas para Autores
app.get('/autores', async (request: FastifyRequest, reply: FastifyReply) => {
  const { nacionalidade } = request.query as any;
  let conn;
  try {
    conn = await criarConexao();

    let sql = `SELECT id, nome, nacionalidade FROM autores`;
    const params: any[] = [];

    if (nacionalidade) {
      sql += " WHERE nacionalidade = ?";
      params.push(nacionalidade);
    }

    const [rows] = await conn.query(sql, params);
    reply.status(200).send(rows);
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.get('/autores/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  let conn;
  try {
    conn = await criarConexao();
    const [rows] = await conn.query(
      `SELECT id, nome, nacionalidade FROM autores WHERE id = ?`, 
      [id]
    );
    
    if ((rows as any).length === 0) {
      return reply.status(404).send({ mensagem: "Autor não encontrado" });
    }
    
    reply.status(200).send((rows as any)[0]);
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.post('/autores', async (request: FastifyRequest, reply: FastifyReply) => {
  const { nome, nacionalidade } = request.body as any;
  let conn;

  if (!nome || !nacionalidade) {
    return reply.status(400).send({ 
      mensagem: "Campos obrigatórios: nome, nacionalidade" 
    });
  }

  try {
    conn = await criarConexao();

    const [result] = await conn.query(
      `INSERT INTO autores (nome, nacionalidade)
       VALUES (?, ?)`,
      [nome, nacionalidade]
    );

    reply.status(201).send({ 
      id: (result as any).insertId, 
      nome, 
      nacionalidade
    });
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.put('/autores/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  const { nome, nacionalidade } = request.body as any;
  let conn;

  if (!nome && !nacionalidade) {
    return reply.status(400).send({ mensagem: "Informe pelo menos um campo para atualizar" });
  }

  try {
    conn = await criarConexao();

    // Verifica se o autor existe
    const [autor] = await conn.query("SELECT id FROM autores WHERE id = ?", [id]);
    if ((autor as any).length === 0) {
      return reply.status(404).send({ mensagem: "Autor não encontrado" });
    }

    const campos: string[] = [];
    const valores: any[] = [];

    if (nome) {
      campos.push("nome = ?");
      valores.push(nome);
    }
    if (nacionalidade) {
      campos.push("nacionalidade = ?");
      valores.push(nacionalidade);
    }

    valores.push(id);
    const sql = `UPDATE autores SET ${campos.join(", ")} WHERE id = ?`;
    await conn.query(sql, valores);

    reply.status(200).send({ mensagem: "Autor atualizado com sucesso" });
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

app.delete('/autores/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  let conn;

  try {
    conn = await criarConexao();
    
    // Verifica se o autor existe
    const [autor] = await conn.query("SELECT id FROM autores WHERE id = ?", [id]);
    if ((autor as any).length === 0) {
      return reply.status(404).send({ mensagem: "Autor não encontrado" });
    }

    // Verifica se existem livros associados
    const [livros] = await conn.query("SELECT id FROM livros WHERE autor_id = ?", [id]);
    if ((livros as any).length > 0) {
      return reply.status(400).send({ 
        mensagem: "Não é possível excluir autor com livros associados" 
      });
    }

    await conn.query("DELETE FROM autores WHERE id = ?", [id]);
    reply.status(200).send({ mensagem: "Autor removido com sucesso" });
  } catch (erro: any) {
    tratarErro(erro, reply);
  } finally {
    if (conn) await conn.end();
  }
});

// Função de tratamento de erros
function tratarErro(erro: any, reply: FastifyReply) {
  if (erro.code === "ECONNREFUSED") {
    reply.status(500).send({ mensagem: "ERRO: conexão recusada (ligue o banco de dados!)" });
  } else if (erro.code === "ER_BAD_DB_ERROR") {
    reply.status(500).send({ mensagem: "ERRO: banco de dados não encontrado" });
  } else if (erro.code === "ER_ACCESS_DENIED_ERROR") {
    reply.status(500).send({ mensagem: "ERRO: usuário/senha inválidos" });
  } else if (erro.code === "ER_DUP_ENTRY") {
    reply.status(400).send({ mensagem: "ERRO: entrada duplicada (ID já existe)" });
  } else if (erro.code === "ER_NO_SUCH_TABLE") {
    reply.status(500).send({ mensagem: "ERRO: tabela não existe" });
  } else if (erro.code === "ER_NO_REFERENCED_ROW_2") {
    reply.status(400).send({ mensagem: "ERRO: chave estrangeira inválida" });
  } else {
    console.error(erro);
    reply.status(500).send({ mensagem: "ERRO desconhecido", detalhe: erro.message });
  }
}

// Inicialização do servidor
app.listen({ port: 8000, host: '0.0.0.0' })
  .then(() => console.log(`Servidor rodando em http://localhost:8000`))
  .catch(err => {
    console.error('Erro ao iniciar:', err);
    process.exit(1);
  });
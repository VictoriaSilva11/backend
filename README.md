CREATE DATABASE IF NOT EXISTS books44;
USE books44;

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  preco DECIMAL(10,2),
  genero VARCHAR(50),
  ano_publicacao INT,
  autor_id INT,
  FOREIGN KEY (autor_id) REFERENCES autores(id)
);

CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50)
);


-- Inserção de autores
INSERT INTO autores (id, nome, nacionalidade) VALUES (1, 'Frank Herbert', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (2, 'George R. R. Martin', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (3, 'Ali Hazelwood', 'Italiana');
INSERT INTO autores (id, nome, nacionalidade) VALUES (4, 'Allison Saft', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (5, 'C. S. Pacat', 'Australiana');
INSERT INTO autores (id, nome, nacionalidade) VALUES (6, 'Sarah J. Maas', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (7, 'Lynn Painter', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (8, 'C. S. Pacat', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (9, 'Holly Jackson', 'Britânica');
INSERT INTO autores (id, nome, nacionalidade) VALUES (10, 'SenLynYu', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (11, 'Grady Hendrix', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (12, 'Holly Black', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (13, 'Hannah Nicole Maehrer', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (14, 'Agatha Christie', 'Britânica');
INSERT INTO autores (id, nome, nacionalidade) VALUES (15, 'Carla Madeira', 'Brasileira');
INSERT INTO autores (id, nome, nacionalidade) VALUES (16, 'Mark Miller', 'Brasileiro');
INSERT INTO autores (id, nome, nacionalidade) VALUES (17, 'Elena Armas', 'Espanhola');
INSERT INTO autores (id, nome, nacionalidade) VALUES (18, 'V. E. Schawb', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (19, 'C. C. Hunter', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (20, 'Virginia Woolf', 'Britânica');
INSERT INTO autores (id, nome, nacionalidade) VALUES (21, 'Stephen King', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (22, 'Tatielle Katluryn', 'Brasileira');
INSERT INTO autores (id, nome, nacionalidade) VALUES (23, 'Sophie Kim', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (24, 'Lev Tolstói', 'Russo');
INSERT INTO autores (id, nome, nacionalidade) VALUES (25, 'Elayne Baeta', 'Brasileira');
INSERT INTO autores (id, nome, nacionalidade) VALUES (26, 'E. K. Johnston', 'Canadense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (27, 'Victor Hugo', 'Francês');
INSERT INTO autores (id, nome, nacionalidade) VALUES (28, 'Rebecca Yarros', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (29, 'Stephanie Garber', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (30, 'J. K. Rowling', 'Britânica');
INSERT INTO autores (id, nome, nacionalidade) VALUES (31, 'Riley Sager', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (32, 'Diana Wynne Jones', 'Britânica');
INSERT INTO autores (id, nome, nacionalidade) VALUES (33, 'Fiódor Dostoiévski', 'Russo');
INSERT INTO autores (id, nome, nacionalidade) VALUES (34, 'Rebecca Ross', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (35, 'Brandon Sanderson', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (36, 'Uketsu', 'Japonês');
INSERT INTO autores (id, nome, nacionalidade) VALUES (37, 'Adrian Tchaikovsky', 'Britânico');
INSERT INTO autores (id, nome, nacionalidade) VALUES (38, 'Ishida Syou', 'Japonês');
INSERT INTO autores (id, nome, nacionalidade) VALUES (39, 'Suzanne Collins', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (40, 'Sally Rooney', 'Irlandesa');
INSERT INTO autores (id, nome, nacionalidade) VALUES (41, 'Alice Oseman', 'Britânica');
INSERT INTO autores (id, nome, nacionalidade) VALUES (42, 'Stephenie Meyer', 'Estadunidense');
INSERT INTO autores (id, nome, nacionalidade) VALUES (43, 'Lewis Carroll', 'Britânico');


-- Inserção de livros
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (1, 'Duna', 80.00, 'Ficção', 1965, 1);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (2, 'Fogo & Sangue', 95.00, 'Ficção', 2018, 2);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (3, 'Noiva', 59.90, 'Romance', 2024, 3);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (4, 'Asas reluzentes', 65.00, 'Romance', 2025, 4);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (5, 'Ascenção das Trevas', 59.90, 'Fantasia', 2023, 5);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (6, 'Não é como nos filmes', 45.90, 'Romance', 2025, 7);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (7, 'Herdeiro das trevas', 55.00, 'Fantasia', 2024, 5);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (8, 'Manual de assassinato para boas garotas', 59.90, 'Mistério', 2025, 9);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (9, 'Alchemised', 97.00, 'Romance', 2025, 10);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (10, 'Manual das donas de casa caçadoras de vampiros', 59.90, 'Suspense', 2025, 11);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (11, 'O príncipe cruel', 45.00, 'Fantasia', 2018, 12);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (12, 'Aprendiz do vilão', 48.99, 'Romance', 2025, 13);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (13, 'Morte no Nilo', 35.90, 'Mistério', 2020, 14);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (14, 'Tudo é rio', 59.90, 'Drama', 2023, 15);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (15, 'Ninguém vai te ouvir gritar', 44.50, 'Suspense', 2024, 16);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (16, 'Um experimento de amor em Nova York', 59.90, 'Romance', 2022, 17);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (17, 'A vida invisível de Addie Larue', 69.00, 'Romance', 2021, 18);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (18, 'Eu e esse meu coração', 34.90, 'Romance', 2019, 19);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (19, 'Mrs. Dalloway', 36.40, 'Romance', 1925, 20);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (20, 'Corte de espinhos e rosas', 55.70, 'Fantasia', 2015, 6);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (21, 'Misery', 68.30, 'Thriller', 2024, 21);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (22, 'O horizonte mora em um dia cinza', 44.90, 'Romance', 2023, 22);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (23, 'O deus e a raposa', 79.80, 'Fantasia', 2025, 23);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (24, 'A morte de Ivan Ilitch', 68.30, 'Literatura', 1886, 24);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (25, 'Coisas óbvias sobre o amor', 56.40, 'Romance', 2024, 25);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (26, 'A sombra da Rainha', 55.00, 'Ficção', 2023, 26);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (27, 'Os Miseráveis', 115.99, 'Literatura', 1862, 27);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (28, 'Xeque-mate', 44.90, 'Romance', 2024, 3);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (29, 'Mansão Gallant', 76.40, 'Thriller', 2022, 18);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (30, 'Um amor problemático de verão', 44.59, 'Romance', 2025, 3);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (31, 'Quarta asa', 97.50, 'Fantasia', 2023, 28);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (32, 'Era uma vez um coração partido', 49.90, 'Fantasia', 2021, 29);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (33, 'Harry Potter e o cálice de fogo', 55.70, 'Aventura', 2002, 30);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (34, 'No fundo é amor', 45.40, 'Romance', 2025, 3);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (35, 'O massacre da família Hope', 37.00, 'Thriller', 2018, 31);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (36, 'O castelo animado', 60.51, 'Aventura', 2003, 32);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (37, 'Não é amor', 45.99, 'Romance', 2025, 3);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (38, 'Trono de vidro', 59.00, 'Fantasia', 2015, 6);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (39, 'Crime e Castigo', 65.23, 'Literatura', 1866, 33);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (40, 'Divinos rivais', 36.40, 'Romance', 2024, 34);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (41, 'Warbreaker: O sopro dos deuses', 120.00, 'Fantasia', 2024, 35);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (42, 'Casa estranhas', 33.97, 'Thriller', 2025, 36);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (43, 'Caraval', 56.40, 'Fantasia', 2023, 29);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (44, 'Herdeiros do tempo', 68.30, 'Ficção', 2024, 37);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (45, 'Vou te receitar um gato', 68.30, 'Aventura', 2024, 38);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (46, 'Amanhecer na colheita', 68.30, 'Distopia', 2024, 39);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (47, 'Intermezzo', 68.30, 'Drama', 2024, 40);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (48, 'Heartstoper 3: Um passo adiante', 68.30, 'Romance', 2024, 41);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (49, 'Crepúsculo', 68.30, 'Romance', 2024, 42);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (50, 'Alice no Páis das Maravilhas', 68.30, 'Thriller', 2024, 43);
INSERT INTO livros (id, titulo, preco, genero, ano_publicacao, autor_id) VALUES (51, 'Box Trono de Vidro', 389.00, 'Fantasia', 2015, 6);

####Com as id's
SELECT 
    livros.id AS livro_id,
    livros.titulo,
    livros.preco,
    livros.genero,
    livros.ano_publicacao,
    autores.id AS autor_id,
    autores.nome AS autor_nome,
    autores.nacionalidade AS autor_nacionalidade
FROM 
    livros
INNER JOIN 
    autores ON livros.autor_id = autores.id;


####Sem as id's
SELECT 
    livros.titulo,
    livros.preco,
    livros.genero,
    livros.ano_publicacao,
    autores.nome AS autor_nome,
    autores.nacionalidade AS autor_nacionalidade
FROM 
    livros
INNER JOIN 
    autores ON livros.autor_id = autores.id;
    
    

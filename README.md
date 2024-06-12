# Documentação da API de Gerenciamento de Livros e Empréstimos
## Visão Geral
Este projeto consiste em uma API para gerenciamento de livros e empréstimos em uma livraria. A API permite visualizar, adicionar, editar e excluir livros, além de gerenciar empréstimos de livros para alunos. A API se conecta a um banco de dados PostgreSQL para armazenar as informações.

# Objetivos
O objetivo deste projeto é fornecer uma interface prática e eficiente para gerenciar o catálogo de livros e os empréstimos, facilitando o controle e a organização da livraria.

# Tecnologias Utilizadas
- Node.js
- Express.js
- PostgreSQL

# Requisitos
Para executar este projeto, é necessário ter o Node.js e o PostgreSQL instalados.

# Instale as dependências:
``` bash
npm install express
npm install body-parser
npm install pg
```

## Configure o banco de dados PostgreSQL:
Crie um banco de dados chamado Livraria.
Execute o script SQL fornecido para criar as tabelas:
```bash
CREATE TABLE LIVROS (
    ISBN VARCHAR(13) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    Estoque_Min INT NOT NULL,
    Quantidade_Livros INT NOT NULL,
    foto BYTEA
);

CREATE TABLE CURSOS (
    ID_Curso SERIAL PRIMARY KEY,
    nome_curso VARCHAR(255) NOT NULL
);

CREATE TABLE ALUNOS (
    matricula SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    ID_Curso INT NOT NULL,
    senha VARCHAR(255) NOT NULL,
    FOREIGN KEY (ID_Curso) REFERENCES CURSOS(ID_Curso)
);

CREATE TABLE EMPRESTIMOS (
    ID_emprestimo SERIAL PRIMARY KEY,
    matricula_aluno INT NOT NULL,
    ISBN VARCHAR(13) NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    FOREIGN KEY (matricula_aluno) REFERENCES ALUNOS(matricula),
    FOREIGN KEY (ISBN) REFERENCES LIVROS(ISBN)
);

CREATE TABLE MULTA (
    ID_Multa SERIAL PRIMARY KEY,
    Multa DECIMAL(10, 2) NOT NULL,
    ID_emprestimo INT NOT NULL,
    ISBN VARCHAR(13) NOT NULL,
    FOREIGN KEY (ID_emprestimo) REFERENCES EMPRESTIMOS(ID_emprestimo),
    FOREIGN KEY (ISBN) REFERENCES LIVROS(ISBN)
);

CREATE TABLE CURSOS_LIGADOS_AO_LIVRO (
    Quantidade_Livros INT NOT NULL,
    ID_Curso INT NOT NULL,
    ISBN VARCHAR(13) NOT NULL,
    PRIMARY KEY (Quantidade_Livros, ID_Curso, ISBN),
    FOREIGN KEY (ID_Curso) REFERENCES CURSOS(ID_Curso),
    FOREIGN KEY (ISBN) REFERENCES LIVROS(ISBN)
);

CREATE TABLE AGENDAMENTO (
    ID_Agendamento SERIAL PRIMARY KEY,
    matricula_aluno INT NOT NULL,
    ISBN VARCHAR(13) NOT NULL,
    data_limite DATE NOT NULL,
    Status BOOLEAN,
    FOREIGN KEY (matricula_aluno) REFERENCES ALUNOS(matricula),
    FOREIGN KEY (ISBN) REFERENCES LIVROS(ISBN)
);

````
## Configure as variáveis de ambiente no arquivo config/db.js:

```bash
js
Copiar código
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Livraria',
  password: 'projectspostgresql', // alterar
  port: 5432, // alterar
});

module.exports = pool;
````

#Inicie o servidor:
```bash
node server.js
````
Acesse a API em http://localhost:3000.

# Rotas da API

## Rotas de Livros

### GET /livros

- **Descrição:** Visualizar todos os livros.
- **Resposta:** JSON com a lista de livros.

### GET /livros/:isbn

- **Descrição:** Pesquisar livro pelo ISBN.
- **Parâmetros:** isbn (string) - ISBN do livro.
- **Resposta:** JSON com as informações do livro.

### POST /livros

- **Descrição:** Adicionar um novo livro.
- **Corpo da Requisição:** JSON com as informações do livro (ISBN, titulo, autor, Estoque_Min, Quantidade_Livros, foto).
- **Resposta:** Mensagem de sucesso.

### PUT /livros/:isbn

- **Descrição:** Editar um livro existente.
- **Parâmetros:** isbn (string) - ISBN do livro.
- **Corpo da Requisição:** JSON com as novas informações do livro.
- **Resposta:** Mensagem de sucesso.

### DELETE /livros/:isbn

- **Descrição:** Excluir um livro.
- **Parâmetros:** isbn (string) - ISBN do livro.
- **Resposta:** Mensagem de sucesso.

### PATCH /livros/estoque

- **Descrição:** Atualizar o estoque de um livro.
- **Corpo da Requisição:** JSON com o isbn (string) e a quantidade (int) a ser atualizada.
- **Resposta:** Mensagem de sucesso.

## Rotas de Empréstimos

### POST /emprestimos

- **Descrição:** Solicitar um novo empréstimo.
- **Corpo da Requisição:** JSON com matricula (int), isbn (string).
- **Resposta:** JSON com as informações do empréstimo.

### GET /emprestimos/:matricula

- **Descrição:** Gerenciar empréstimos de um aluno.
- **Parâmetros:** matricula (int) - Matrícula do aluno.
- **Resposta:** JSON com os empréstimos atuais e antigos do aluno.

### PUT /emprestimos/devolver

- **Descrição:** Devolver um livro emprestado.
- **Corpo da Requisição:** JSON com idEmprestimo (int), multa (decimal).
- **Resposta:** JSON com as informações do empréstimo devolvido.

//models/livroModel.js
const pool = require('../config/db');

const getLivros = async () => {
    const res = await pool.query('SELECT * FROM LIVROS');
    return res.rows;
};

const getLivroByISBN = async (ISBN) => {
    const res = await pool.query('SELECT * FROM LIVROS WHERE ISBN = $1', [ISBN]);
    return res.rows[0];
};

const addLivro = async ({ ISBN, titulo, autor, Estoque_Min, Quantidade_Livros, foto }) => {
    await pool.query(
        'INSERT INTO LIVROS (ISBN, titulo, autor, Estoque_Min, Quantidade_Livros, foto) VALUES ($1, $2, $3, $4, $5, $6)',
        [ISBN, titulo, autor, Estoque_Min, Quantidade_Livros, foto]
    );
};

const updateLivro = async (ISBN, { titulo, autor, Estoque_Min, Quantidade_Livros, foto }) => {
    await pool.query(
        'UPDATE LIVROS SET titulo = $1, autor = $2, Estoque_Min = $3, Quantidade_Livros = $4, foto = $5 WHERE ISBN = $6',
        [titulo, autor, Estoque_Min, Quantidade_Livros, foto, ISBN]
    );
};

const deleteLivro = async (ISBN) => {
    await pool.query('DELETE FROM LIVROS WHERE ISBN = $1', [ISBN]);
};

const updateEstoque = async (ISBN, quantidade) => {
    await pool.query('UPDATE LIVROS SET Quantidade_Livros = $1 WHERE ISBN = $2', [quantidade, ISBN]);
};

module.exports = {
    getLivros,
    getLivroByISBN,
    addLivro,
    updateLivro,
    deleteLivro,
    updateEstoque
};

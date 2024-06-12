// controllers/livroController.js
const livroModel = require('../models/livroModel');

const visualizarLivro = async (req, res) => {
    try {
        const livros = await livroModel.getLivros();
        res.json(livros);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const pesquisarLivro = async (req, res) => {
    const { isbn } = req.params;
    try {
        const livro = await livroModel.getLivroByISBN(isbn);
        res.json(livro);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const adicionarLivro = async (req, res) => {
    const { ISBN, titulo, autor, Estoque_Min, Quantidade_Livros, foto } = req.body;
    try {
        await livroModel.addLivro({ ISBN, titulo, autor, Estoque_Min, Quantidade_Livros, foto });
        res.status(201).json({ message: 'Livro adicionado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editarLivro = async (req, res) => {
    const { isbn } = req.params;
    const { titulo, autor, Estoque_Min, Quantidade_Livros, foto } = req.body;
    try {
        await livroModel.updateLivro(isbn, { titulo, autor, Estoque_Min, Quantidade_Livros, foto });
        res.json({ message: 'Livro atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const excluirLivro = async (req, res) => {
    const { isbn } = req.params;
    try {
        await livroModel.deleteLivro(isbn);
        res.json({ message: 'Livro excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const gerenciarEstoque = async (req, res) => {
    const { isbn, quantidade } = req.body;
    try {
        await livroModel.updateEstoque(isbn, quantidade);
        res.json({ message: 'Estoque atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    visualizarLivro,
    pesquisarLivro,
    adicionarLivro,
    editarLivro,
    excluirLivro,
    gerenciarEstoque
};

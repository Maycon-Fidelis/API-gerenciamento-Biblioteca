// routes/livros.js
const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/', livroController.visualizarLivro);
router.get('/:isbn', livroController.pesquisarLivro);
router.post('/', livroController.adicionarLivro);
router.put('/:isbn', livroController.editarLivro);
router.delete('/:isbn', livroController.excluirLivro);
router.patch('/estoque', livroController.gerenciarEstoque);

module.exports = router;

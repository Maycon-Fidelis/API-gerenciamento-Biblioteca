// routes/emprestimos.js
const express = require('express');
const router = express.Router();
const emprestimoController = require('../controllers/emprestimoController');

router.post('/', emprestimoController.solicitarEmprestimo);
router.get('/:matricula', emprestimoController.gerenciarEmprestimos);
router.put('/devolver', emprestimoController.devolverLivro);

module.exports = router;

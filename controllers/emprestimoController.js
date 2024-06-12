//controller/emprestimoController.js
const emprestimoModel = require('../models/emprestimoModel');

const visualizarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimoModel.getEmprestimos();
        res.json(emprestimos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const solicitarEmprestimo = async (req, res) => {
    const { matricula, isbn } = req.body;
    const dataEmprestimo = new Date();
    try {
        const emprestimo = await emprestimoModel.createEmprestimo(matricula, isbn, dataEmprestimo);
        res.json(emprestimo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const gerenciarEmprestimos = async (req, res) => {
    const { matricula } = req.params;
    try {
        const emprestimosAtuais = await emprestimoModel.getEmprestimosAtuais(matricula);
        const emprestimosAntigos = await emprestimoModel.getEmprestimosAntigos(matricula);
        res.json({ emprestimosAtuais, emprestimosAntigos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const devolverLivro = async (req, res) => {
    const { idEmprestimo, multa } = req.body;
    const dataDevolucao = new Date();
    try {
        const emprestimoDevolvido = await emprestimoModel.devolverLivro(idEmprestimo, dataDevolucao);
        if (multa > 0) {
            await emprestimoModel.calcularMulta(idEmprestimo, multa);
        }
        res.json(emprestimoDevolvido);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    visualizarEmprestimos,
    solicitarEmprestimo,
    gerenciarEmprestimos,
    devolverLivro
};

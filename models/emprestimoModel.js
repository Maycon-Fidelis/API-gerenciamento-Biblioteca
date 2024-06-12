//models/emprestimoModel.js
const pool = require('../config/db');

const getEmprestimos = async () => {
    const res = await pool.query('SELECT * FROM EMPRESTIMOS');
    return res.rows;
};

const createEmprestimo = async (matricula, isbn, dataEmprestimo) => {
    const res = await pool.query(
        'INSERT INTO EMPRESTIMOS (matricula_aluno, ISBN, data_emprestimo) VALUES ($1, $2, $3) RETURNING *',
        [matricula, isbn, dataEmprestimo]
    );
    return res.rows[0];
};

const getEmprestimosAtuais = async (matricula) => {
    const res = await pool.query(
        'SELECT * FROM EMPRESTIMOS WHERE matricula_aluno = $1 AND data_devolucao IS NULL',
        [matricula]
    );
    return res.rows;
};

const getEmprestimosAntigos = async (matricula) => {
    const res = await pool.query(
        'SELECT * FROM EMPRESTIMOS WHERE matricula_aluno = $1 AND data_devolucao IS NOT NULL',
        [matricula]
    );
    return res.rows;
};

const devolverLivro = async (idEmprestimo, dataDevolucao) => {
    const res = await pool.query(
        'UPDATE EMPRESTIMOS SET data_devolucao = $1 WHERE ID_emprestimo = $2 RETURNING *',
        [dataDevolucao, idEmprestimo]
    );
    return res.rows[0];
};

const calcularMulta = async (idEmprestimo, multa) => {
    const res = await pool.query(
        'INSERT INTO MULTA (Multa, ID_emprestimo, ISBN) VALUES ($1, $2, (SELECT ISBN FROM EMPRESTIMOS WHERE ID_emprestimo = $2)) RETURNING *',
        [multa, idEmprestimo]
    );
    return res.rows[0];
};

module.exports = {
    getEmprestimos,
    createEmprestimo,
    getEmprestimosAtuais,
    getEmprestimosAntigos,
    devolverLivro,
    calcularMulta
};

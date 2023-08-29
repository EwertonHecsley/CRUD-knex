const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const knex = require('../conexao');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, senhaHash);

        const buscarBd = await knex('usuarios').select('*').where({ id }).first();

        if (!buscarBd) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...usuario } = buscarBd

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verificaLogin
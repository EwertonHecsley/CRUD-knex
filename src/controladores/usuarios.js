const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const knex = require('../conexao');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório");
    }

    if (!email) {
        return res.status(404).json("O campo email é obrigatório");
    }

    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório");
    }

    if (!nome_loja) {
        return res.status(404).json("O campo nome_loja é obrigatório");
    }

    try {
        //const { rowCount: quantidadeUsuarios } = await conexao.query('select * from usuarios where email = $1', [email]);
        const buscarBd = await knex('usuarios').select('*').where({ email }).debug()

        if (buscarBd.length > 0) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        //const query = 'insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)';
        const usuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada, nome_loja })
            .returning(['nome', 'email', 'nome_loja'])
            .debug();

        if (!usuario) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json(usuario[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome && !email && !senha && !nome_loja) {
        return res.status(400).json('É obrigatório informar ao menos um campo para atualização');
    }

    try {
        const usuarioId = req.usuario.id; // Id do usuário que será atualizado
        const body = {}; // Objeto com os campos a serem atualizados
        const params = {}; // Objeto para a montagem da cláusula WHERE

        if (nome) {
            body.nome = nome;
        }

        if (email) {
            if (email !== req.usuario.email) {
                const usuarioExistente = await knex('usuarios').where({ email }).first();

                if (usuarioExistente) {
                    return res.status(400).json("O email já existe");
                }
            }

            body.email = email;
        }

        if (senha) {
            body.senha = await bcrypt.hash(senha, 10);
        }

        if (nome_loja) {
            body.nome_loja = nome_loja;
        }

        params.id = usuarioId;

        const usuarioAtualizado = await knex('usuarios')
            .where(params) // Condição para a atualização (chave primária)
            .update(body); // Campos e valores a serem atualizados

        if (usuarioAtualizado === 0) {
            return res.status(400).json("O usuário não foi atualizado");
        }

        return res.status(200).json("Usuário atualizado com sucesso");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
}
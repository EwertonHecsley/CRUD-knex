const knex = require('../conexao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;
    const { categoria } = req.query;

    try {
        if (categoria) {
            const produtos = await knex('produtos').select('*').where({ usuario_id: usuario.id, categoria });
            return res.status(200).json(produtos);
        } else {
            const produtos = await knex('produtos').select('*').where({ usuario_id: usuario.id });
            return res.status(200).json(produtos);
        };

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await knex('produtos').select('*').where({ usuario_id: usuario.id, id }).first();

        if (!produto) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório');
    }

    if (!estoque) {
        return res.status(404).json('O campo estoque é obrigatório');
    }

    if (!preco) {
        return res.status(404).json('O campo preco é obrigatório');
    }

    if (!descricao) {
        return res.status(404).json('O campo descricao é obrigatório');
    }

    try {
        const produto = await knex('produtos')
            .insert({ usuario_id: usuario.id, nome, estoque, preco, categoria, descricao, imagem })
            .returning('*');

        if (produto.length === 0) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        return res.status(200).json(produto[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json('Informe ao menos um campo para atualização do produto');
    }

    try {
        const produto = await knex('produtos')
            .where({ usuario_id: usuario.id, id })
            .first(); // Retorna o primeiro resultado ou undefined se não encontrado

        if (!produto) {
            return res.status(404).json('Produto não encontrado');
        }

        const atualizaProdutos = {};
        if (nome) atualizaProdutos.nome = nome;
        if (estoque) atualizaProdutos.estoque = estoque;
        if (preco) atualizaProdutos.preco = preco;
        if (categoria) atualizaProdutos.categoria = categoria;
        if (descricao) atualizaProdutos.descricao = descricao;
        if (imagem) atualizaProdutos.imagem = imagem;

        const atualizacao = await knex('produtos')
            .where({ usuario_id: usuario.id, id })
            .update(atualizaProdutos)
            .returning('*')

        return res.status(200).json({ mensagem: 'Produto foi atualizado com sucesso.', produto: atualizacao });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoDel = await knex('produtos').select('*').where({ usuario_id: usuario.id, id });

        if (produtoDel.length === 0) {
            return res.status(404).json('Produto não encontrado');
        }

        const produtoExcluido = await knex('produtos').where({ usuario_id: usuario.id, id }).del();

        if (produtoExcluido.length === 0) {
            return res.status(400).json("O produto não foi excluido");
        }

        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}
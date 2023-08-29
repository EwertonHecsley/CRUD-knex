const knex = require('knex');
require('dotenv').config()

const dbConfig = {
    client: 'pg',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
};

const conexao = knex(dbConfig);

module.exports = conexao;
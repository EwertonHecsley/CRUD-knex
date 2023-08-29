# - Projeto CRUD de Gerenciamento de Produtos e Usuários -

Este projeto é um exemplo de aplicativo web construído usando Node.js e Express.js, com foco na implementação das operações CRUD (Create, Read, Update, Delete) para gerenciar produtos e usuários. O aplicativo permite o cadastro e login de usuários, além de fornecer funcionalidades para gerenciar informações de produtos.


## Tecnologias Utilizadas

1. **Node.js:** Plataforma JavaScript que permite a execução de código JavaScript no lado do servidor.

2. **Express.js:** Framework web que simplifica a criação de aplicativos web e APIs RESTful.

3. **Knex.js:** Biblioteca que fornece uma interface SQL fluente para interagir com bancos de dados relacionais.

4. **JSON Web Tokens (JWT):** Mecanismo para autenticação e geração de tokens de acesso seguros.

5. **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional utilizado para armazenar informações de produtos e usuários.

## Funcionalidades Principais

1. **Cadastro de Usuários:** Os usuários podem se cadastrar no sistema fornecendo informações como nome de usuário e senha.

2. **Autenticação e Login:** Os usuários podem realizar o login com suas credenciais e receber um token JWT para autenticação subsequente.

3. **Gerenciamento de Produtos:** Os usuários autenticados podem cadastrar, listar, atualizar e excluir produtos.

4. **Perfil de Usuário:** Os usuários podem visualizar e atualizar seu próprio perfil, incluindo informações como nome de usuário e senha.

5. **Migrações de Banco de Dados:** Utilização do Knex.js para gerenciar migrações de banco de dados, facilitando a evolução do esquema do banco de dados.

  
## Configuração

1. **Clone o repositório:**
```
git clone https://github.com/seu-usuario/seu-projeto.git
```
 2. **Instale as dependências:**
```
npm install
```
 3. **Configure suas variáveis de ambiente em um arquivo .env na raiz do projeto:**
```
host=seu-host
user=seu-usuario
password=sua-senha
database=seu-banco-de-dados
```

**Inicie o servidor:**
```
npm start
```
O servidor estará disponível em: http://localhost:3000





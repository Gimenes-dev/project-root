# project-root

# Projeto de API de Gerenciamento de Tarefas

Este é um projeto de uma API simples para gerenciamento de tarefas, desenvolvido com Node.js, Expres, SQLite e jsonwebtoken.

## Funcionalidades

- CRUD (Create, Read, Update, Delete) de tarefas
- Registro de usuários com autenticação básica

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

project-root/
│
├── src/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── app.js
│
├── .env
├── .gitignore
├── README.md
└── package.json

- **src/**: Contém os controladores, modelos, rotas, middlewares e arquivos relacionados à lógica da aplicação.
- **.env**: Arquivo para configuração das variáveis de ambiente.
- **.gitignore**: Arquivo para especificar quais arquivos e pastas devem ser ignorados pelo Git.
- **README.md**: Este arquivo, que contém informações sobre o projeto.

## Instalação

Para rodar este projeto localmente, siga os passos abaixo:

1. Clone este repositório:

   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto

2. Instale as dependências:

   npm install

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as variáveis necessárias, como `PORT` e configurações do banco de dados

4. Inicie o servidor:

   npm start

## Endpoints da API

- **GET /api/tasks**: Retorna todas as tarefas.
- **POST /api/tasks**: Cria uma nova tarefa.
- **GET /api/tasks/:id**: Retorna uma tarefa específica pelo ID.
- **PUT /api/tasks/:id**: Atualiza uma tarefa existente pelo ID.
- **DELETE /api/tasks/:id**: Deleta uma tarefa existente pelo ID.

- **POST /api/users/register**: Registra um novo usuário.
- **POST /api/users/login**: Autentica o usuário e retorna um token de acesso.

## Tecnologias Utilizadas

- Node.js
- Express
- SQLite
- body-parser
- dotenv
- jsonwebtoken

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues se encontrar algum problema.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

Este `README.md` fornece uma visão geral do seu projeto, explicando a estrutura, como instalar e usar, os endpoints da API disponíveis, tecnologias utilizadas, como contribuir e informações sobre a licença. Você pode personalizar e adicionar mais informações conforme necessário para o seu projeto específico.
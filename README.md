# autoAPI


Este projeto visa desenvolver uma WebAPI para controlar a utilização dos automóveis de uma empresa. A API oferece funcionalidades de cadastro, atualização, exclusão e consulta de automóveis e motoristas, além de registro e consulta de utilização de automóveis por motoristas.

### Funcionalidades
* adastro de Automóvel
* Cadastrar um novo automóvel
* Atualizar um automóvel cadastrado
* Excluir um automóvel cadastrado
* Recuperar um automóvel cadastrado pelo seu identificador único
* Listar os automóveis cadastrados. Deve ser possível filtrar a listagem dos automóveis por cor e marca.
* Cadastro de Motoristas
* Cadastrar um novo motorista
* Atualizar um motorista cadastrado
* Excluir um motorista cadastrado
* Recuperar um motorista cadastrado pelo seu identificador único
* Listar os motoristas cadastrados. Deve ser possível filtrar a listagem dos motoristas por nome.
* Utilização de um Automóvel
* Criar um registro que represente a utilização de um automóvel por um motorista, com uma data de início e um texto do motivo de utilização.
* Finalizar a utilização de um automóvel por um motorista guardando a data de finalização
* Listar os registros de utilização cadastrados no sistema com o nome do motorista e as informações do automóvel utilizado.
# Recursos utilizado
#### linguagem 
Utilizado o node na versão 20.12.2 junto com o typescript.
### banco de dados
utilizado o postgress como banco relacional com o TypeORM.
### testes
utilizado o jest para cobrir 100% código.
### documentação
para a documentação da api foi utilizado o swagger.


# Instalação

versão do node utilizado: 20.12.2.

Na pasta raiz executa o comando: `npm install`

## Configuração
Ainda na pasta execute os seguintes comando 


#### DATABASE
Para facilitar na hora de iniciar o projeto, foi criado um dockerFile para o banco de dados

``docker build -t nome_da_imagem .`` <- nâo esquecer do ponto \
``docker run -d -p 5432:5432 nome_da_imagem``

#### ENV's

`USERDB=postgressUser `\
`PASSWORDDB=password`\
`DATABASE=postgressDB`\
`SCHEMA=public`\
`HOST=localhost`\
`PORT=5432`

#### execuntando o codigo

`npm run dev`

## Swagger

http://localhost:3000/api-docs


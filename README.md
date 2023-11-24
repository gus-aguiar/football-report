# FootBall Report

## Visão Geral

Bem-vindo ao Trybe Futebol Clube! Este projeto oferece uma API para visualização de partidas e classificações de futebol.

## Funcionalidades

- Desenvolvimento de uma API utilizando TDD
- Integração das aplicações através do docker-compose para funcionar com um banco de dados

## Estrutura

### Banco de Dados

- MySQL em um container Docker via docker-compose
- Acesso via sequelize e também através de clientes MySQL
- Configurações disponíveis no docker-compose

### Backend

- Desenvolvimento principal na porta 3001
- Inicialização a partir de `app/backend/src/server.ts`
- Dependências listadas em `app/backend/packages.npm`

### Frontend

- Comunica-se com o backend através de `http://localhost:3001`

### Docker

- docker-compose para unir os serviços (backend, frontend e db)
- Configuração nos Dockerfiles do frontend e backend

## Requisitos

### Pré-requisitos

- Node.js 16
- Docker e docker-compose versão >=1.29.2

### Configuração Docker

- Docker e docker-compose na versão adequada
- Dockerfiles para frontend e backend configurados corretamente

## Execução

- Utilize `npm run compose:up` na raiz do projeto para subir a aplicação com docker-compose


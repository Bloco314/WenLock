# WenLock

Sistema web desenvolvido com **React, NestJS e MySQL**, com suporte a execução local ou através do Docker.

## Tecnologias

# Backend
- Node.js
- NestJS
- TypeScript
- TypeORM
- JWT
- Bcrypt

# Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

---

# Como rodar

Existem duas formas de executar o projeto:

- **Docker** — 
- **Localmente** — 

---

## Com Docker

### 1. Pré-requisitos

Instale:

- Docker
- Docker Compose

### 2. Clone o projeto

```bash
git clone https://github.com/Bloco314/WenLock
cd WenLock
```

### 3. Configure o ambiente

O Docker utiliza as configurações definidas no `docker-compose.yml`.

O backend deve utilizar:

```env (do backend)
DB_HOST=mysql
DB_PORT=3306
```

> Dentro do Docker, `mysql` é o nome do serviço do banco.

### 4. Suba o projeto

```bash
docker compose up --build
```

Para executar em segundo plano:

```bash
docker compose up -d --build
```

### 5. Acesse

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

## Parar o projeto

```bash
docker compose down
```

Para parar e apagar os dados do banco:

```bash
docker compose down -v
```

> Use `-v` somente quando quiser recriar o banco do zero.

---

# 💻 Rodando localmente

Para executar sem Docker, é necessário ter:

- Node.js
- npm
- MySQL

## Backend

```bash
cd backend
npm install
```

Configure o arquivo:

```text
backend/.env
```

Exemplo:

```env
PORT=3000

DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=wenlock

JWT_SECRET=sua_chave_secreta
```

Execute o seed:

```bash
npm run seed
```

Inicie o backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

---

## Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Usuário inicial

Para fim de usabilida, o seed cria automaticamente um usuário administrador quando ele ainda não existe.

```text
Email: admin@wenlock.com
Senha: 123456
Matrícula: 000001
```

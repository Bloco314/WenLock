# WenLock

Sistema web desenvolvido com **React, NestJS e MySQL**, com suporte a execução local ou através do Docker.

## Tecnologias

### Backend

- Node.js
- NestJS
- TypeScript
- TypeORM
- JWT
- Bcrypt

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

---

# Como rodar

Existem duas formas de executar o projeto:

- **Docker** — recomendado.
- **Localmente** — exige mais dependências e ações.

---

# Banco de dados

O projeto utiliza **MySQL**.

A configuração do `DB_HOST` depende de onde o backend e o MySQL estão sendo executados.

### Executando tudo localmente

Se o **backend e o MySQL estiverem instalados e rodando na máquina**


Neste caso, o usuário precisa **criar o banco de dados da aplicação manualmente** no MySQL.

Exemplo:

```sql
CREATE DATABASE wenlock;
```

Depois configure o `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=wenlock
```

Este é apenas um exemplo, a porta pode ser diferente caso a 3306 já esteja sendo utilizada, o DB_HOST, DB_USERNAME, O DB_PASSWORD e DB_DATABASE devem corresponder aos dados reais.

> O banco `wenlock` precisa existir antes de iniciar o backend.

---

### Executando com Docker

Quando o backend e o MySQL estiverem dentro do Docker, **não utilize `localhost` para acessar o banco**.

Utilize o nome do serviço definido no `docker-compose.yml`, exemplo:

```env
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=wenlock
```

> Dentro do Docker, `mysql` é o nome do container/serviço do banco.  
> `localhost` nesse caso aponta para o próprio container do backend, e não para o MySQL.

O Docker cria o banco automaticamente através da configuração do `docker-compose.yml`.

---

# Com Docker

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

Para o funcionamento correto crie um arquivo backend/.env e preencha-o, por exemplo:

```env
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=wenlock
```

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

# Rodando localmente

Para executar sem Docker, é necessário ter:

- Node.js
- npm
- MySQL

## Backend

```bash
cd backend
npm install
```

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE wenlock;
```

Configure o arquivo:

```text
backend/.env
```

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=wenlock

JWT_SECRET=chave_secreta
```

> **Importante:** ao executar o backend localmente, use `DB_HOST=localhost`.  
> Se o backend estiver dentro do Docker, use `DB_HOST=mysql`. Este JWT_SECRET é apenas um exemplo, caso ele mude deve ser feito a mudança no campo correspondente em docker-compose.yml. 

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

Para facilitar a usabilidade, o seed cria automaticamente um usuário administrador quando ele ainda não existe.

```text
Email: admin@wenlock.com
Senha: 123456
Matrícula: 000001
```
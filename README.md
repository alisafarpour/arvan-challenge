# arvan-challenge-front
This template should help get you started developing with Vue 3 in Vite.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation Back-End Api 
### 1. Clone the Back-End Repository:
To set up the backend API, clone the following repository:
```sh
git clone https://github.com/gothinkster/node-express-realworld-example-app.git
cd node-express-realworld-example-app
npm install
npm start
```
### 2. Setting Up the Database:
1. Create a New Database 

Create a new PostgreSQL database named `conduit`.

2. Configure Environment Variables

Create a `.env` file in the root directory:
```sh
touch .env
```
Add the following configuration to your .env file, replacing `postgres:ali13751375` with your own PostgreSQL username and password:
```sh
DATABASE_URL="postgresql://postgres:ali13751375@localhost:5432/conduit?schema=public"
JWT_SECRET="supersecret123"
```

3. Generate your Prisma client

Run the following command to generate the Prisma Client which will include types based on your database schema:

```shell
npx prisma generate
```

4. Apply any SQL migration script

Run the following command to create/update your database based on existing sql migration scripts:

```shell
npx prisma migrate deploy
```

### 3.The final step is to run the back-end server.
At the end, in the root of the `node-express-realworld-example-app` run this command:
```sh
npm install
npm run dev
```
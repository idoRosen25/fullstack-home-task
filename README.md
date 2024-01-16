
# Fullstack Home Task

This is a home assignment for displayingusers and their posts.
Users are fetched directly from `https://jsonplaceholder.typicon.com` from the client using RTK Query
and posts are fetched both from `https://jsonplaceholder.typicon.com` and from local postgresDB through the server.

## Prerequisites
Make sure your environment is running with Node.js (v18+) and NPM (v10+)

## Frontend
Developed with React + Vite. UI is implemented using MUI componenets and tailwindCSS. Statemanagement using Redux Toolkit and Data fething with RTK Query.

## Backend
Node.js server with NestJS. Using PostgresDB locally for new posts Posts can be created for users fetched from JP only. (no local authentication or authoriztion)


## Install and run locally
* All commands are run from root folder

Clone the project and go to project directory

```bash
  git clone git@github.com:idoRosen25/fullstack-home-task.git
  cd fullstack-home-task
```

Install dependencies (needs to be handled separately for client/server.)

```bash
  cd client && npm install
  cd server && npm install
```

Start the client

```bash
  cd client && npm run dev
```

Start the server

```bash
  cd server && npm run start:dev
```

* Client is running on `http://localhost:3001`
* Server is running on `http://localhost:3000`
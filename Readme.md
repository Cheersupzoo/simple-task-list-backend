# Simple Todo List Backend
A simple todo list backend running on Node.js to showcase API with GraphQL. The data is stored on PostgreSQL and connected with Prisma. The code is written on Typescript and using TypeGraphQL for making GraphQL schema.

## Demo GraphQL Playground
[<img width="120" src="./assets/GraphQLPlaygroundButton.png"/>](https://simple-todo-list-999.herokuapp.com/)

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 14
- PostgreSQL (for storage)
  

# Getting started
- Clone the repository
```
git clone https://github.com/Cheersupzoo/simple-task-list-backend.git
```
- Install dependencies
```
cd simple-task-list-backend
npm install
```
- Setup environment variable for database (may create ".env" file on root of project folder)
```
DATABASE_URL="postgres://{username}:{password}}@{databaseUrl}/{database}"
```

- Build and run the project
```
npm run build
npm start
```
  Navigate to `http://localhost:4000` for GraphQL Playground

- Lint the project
```
npm run lint
```

- Test the project
```
npm run test
```

### Additional Npm Scripts

| Npm Script    | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| `start`       | Runs node on dist/index.js. Can be invoked with `npm start`. Must build before run this.    |
| `build`       | Compile Typescript into Javascript                                                          |
| `postinstall` | Same as build (Used for heroku)                                                             |
| `dev`         | Runs full build. It need to invoke manually when changes. Can be invoked with `npm run dev` |
| `test`        | Runs build and run tests using mocha                                                        |
| `lint`        | Runs TSLint on project files                                                                |


# Features
- Queries
  - lists - get all lists
  - list - get specific list
- Mutations
  - addList - create new list
  - updateList - update specific list
  - removeList - remove specific list
  - addTask - create new task in the list
  - updateTask - update specific task in the list
  - removeTask - delete specific task in the list
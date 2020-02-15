# Meteo-API

API to use along with the front end side [meteo](https://github.com/Natalalia/meteo).

The information that it is served in the different endpoints can be found in the following hosted link [https://meteo-api.herokuapp.com/api](https://meteo-api.herokuapp.com/api) as well as in the `endpoints.json` file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have `node` and `PostgreSQL` installed in your machine.

### Installing

To install the correspondent dependencies indicated in the `package.json`:

```bash
npm install
```

You will also need to create a `knexfile.js` in the root folder in order to connect to your database:

```js
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "meteo_data"
      //username:
      //password:
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

Before you can test the project, you will need to create and seed the database:

```bash
npm run seed-dev
```

To check the functionality, you can start the server listening on _Port 9090_ by running:

```bash
npm start
```

## Running the tests

I made some tests for the endpoints as well as for the extra functionality I needed. To run the tests:

```bash
npm test
```

## Built With

- Node.js
- Express
- PostgreSQL
- knex
- Heroku

### Other Available Scripts

Create a development database locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm migrate-make <filename>
```

Run all migrations:

```bash
npm migrate-latest
```

Rollback all migrations:

```bash
npm migrate-rollback
```

Rollback, migrate latest, then insert data into the db:

```bash
npm run seed
```

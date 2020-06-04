// Update with your config settings.
import dotenv from "dotenv";
dotenv.config();
module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      database: process.env.DB_DEV_DATABASE,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD
    },
    migrations: {
      directory: "./src/db/migrations",
      extension: "ts"
    },
    seeds: {
      directory: "./src/db/seeds",
      extension: "ts"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "asdf",
      user: "asdf",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "asdf",
      user: "asdf",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

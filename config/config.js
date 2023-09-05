const {config} = require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DEV_DB_NAME,
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    logging: console.log,
    port: process.env.DEV_DB_PORT,
  },
  test: {
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT,
    logging: console.log,
    port: process.env.TEST_DB_PORT,
  },
  production: {},
};



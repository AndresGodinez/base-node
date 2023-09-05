const request = require('supertest');
const app = require('../app');
const {StatusCodes} = require('http-status-codes');
const {Sequelize} = require('sequelize');
const {test} = require('../config/config');

const sequelize = new Sequelize(test.database, test.username, test.password, {
  host: test.host,
  dialect: test.dialect,
  port: test.port,
});
describe('this is not a test', () => {
  it('should ', () => {
    expect(true).toBeTruthy();
  });
});
module.exports = {
  request,
  app,
  StatusCodes,
  sequelize,
};

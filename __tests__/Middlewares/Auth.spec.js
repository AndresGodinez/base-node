const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const User = require('../../Models').User;
const userFactory = require('../../Factories/UserFactory');
const {compare, hashPassword} = require('../../Utils/UtilsCrypto');
const jwt = require('jsonwebtoken');

describe('Auth middleware', () => {
  beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    await sequelize.getQueryInterface().showAllTables().then((tableObj) => {
      tableObj.forEach((singleTable) => {
        sequelize.query(`TRUNCATE TABLE \`${singleTable.tableName}\``).
            then(resp => {
              // console.log({'respuesta truncate': resp});
            }).
            catch(e => {
              console.log({e});
            });
      });
    });

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  it('should return 401 if no token is provided', () => {
    request(app).get('/users').expect(401);
  });

  it('should return 401 if token is not valid', async () => {
    const token = await jwt.sign({
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
    }, process.env.SECRET_KEY);
    let notValidToken = token.substring(0, 7);

    request(app).
        get('/users').
        set('Authorization', `Bearer ${notValidToken}`).
        expect(401);
  });

  it('should return 401 if token is invalid', () => {
    request(app).
        get('/users').
        set('Authorization', 'Bearer invalid_token').
        expect(401);
  });

  it('should return 200 if token is valid', async () => {
    const token = await jwt.sign({
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
    }, process.env.SECRET_KEY);

    request(app).
        get('/users').
        set('Authorization', `Bearer ${token}`).
        expect(200);
  });

  it('should return who I am if the token is valid', async () => {
    const simplePassword = 'simple Password';
    const password = await hashPassword(simplePassword);
    const userLine = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      password,
    };

    const token = await jwt.sign({
      user: userLine,
    }, process.env.SECRET_KEY);

    await User.create(userLine);

    const countUsers = await User.findAll();
    expect(countUsers.length).toBe(1);

    const response = await request(app).
        get('/users/me').
        set('Authorization', `Bearer ${token}`).
        expect(200);

    const user = await response.body;

    expect(user.id).toBe(1);
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');

  });
});

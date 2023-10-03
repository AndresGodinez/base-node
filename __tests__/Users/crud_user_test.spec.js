const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const User = require('../../Models').User;
const userFactory = require('../../Factories/UserFactory');
const {compare} = require('../../Utils/UtilsCrypto');
// const {matchers} = require('jest-json-schema');
// expect.extend(matchers);

describe('CRUD de usuarios', () => {

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

  it('should be create a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'simple password',
    };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.lastName).toBe(newUser.lastName);
    expect(response.body.email).toBe(newUser.email);

    const usersOnDb = await User.findAll();
    expect(usersOnDb.length).toBe(1);
  });

  it('should be get all users', async () => {

    const numberUsers = 5;
    await userFactory.createMany('User', numberUsers);

    const response = await request(app).get('/users');

    expect(response.status).toBe(StatusCodes.OK);

    for (const user of response.body) {
      expect(user.password).toBeUndefined();
    }
    expect(response.body.length).toBe(numberUsers);

  });

  it('should be update an exist user', async () => {
    const numberUsers = 2;
    await userFactory.createMany('User', numberUsers);

    const usersOnDb = await User.findAll();
    expect(usersOnDb.length).toBe(2);

    const response = await request(app).put('/users/1').send({
      firstName: 'Jane',
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.firstName).toBe('Jane');

  });

  it('should be able to update the password', async () => {
    const numberUsers = 2;
    await userFactory.createMany('User', numberUsers);

    const usersOnDb = await User.findAll();
    expect(usersOnDb.length).toBe(2);

    const newPassword = {
      password: 'newPassword',
    };

    const response = await request(app).put('/users/1').send(newPassword);

    const userOnDb = await User.findByPk(1);

    const result = await compare(newPassword.password, userOnDb.password);

    expect(response.status).toBe(StatusCodes.OK);
    expect(result).toBeTruthy();

  });

  it('should be delete an user', async () => {
    const numberUsers = 2;
    await userFactory.createMany('User', numberUsers);
    const usersOnDb = await User.findAll();
    expect(usersOnDb.length).toBe(2);

    const response = await request(app).delete('/users/1');

    const usersAfterDelete = await User.findAll();
    expect(usersAfterDelete.length).toBe(1);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });
});

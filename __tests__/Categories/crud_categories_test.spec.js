const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const User = require('../../Models').User;
const userFactory = require('../../Factories/UserFactory');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../../Utils/UtilsCrypto');
// const {matchers} = require('jest-json-schema');
// expect.extend(matchers);

describe('CRUD Categories', () => {

  beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    await sequelize.query('TRUNCATE TABLE Costs');
    await sequelize.query('TRUNCATE TABLE Categories');
    await sequelize.query('TRUNCATE TABLE Users');

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  });

  it('should be create a new category', async () => {
    const newCategory = {
      name: 'Name of category',
    };
    const simplePassword = 'simple Password';
    const password = await hashPassword(simplePassword);
    const userLine = {
      id:1,
      firstName: 'John',
      lastName: 'Doe',
      email:'email@mail.com',
      password,
    };

    const token = await jwt.sign({
      user: userLine,
    }, process.env.SECRET_KEY);

    const userDb = await User.create(userLine);

    const usersOnDb = await User.findAll();
    expect(usersOnDb.length).toBe(1);

    const shortName = newCategory.name.substring(0,4)
    const response = await request(app).
        post('/categories').
        set('Authorization', `Bearer ${token}`).
        send(newCategory);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.name).toBe(newCategory.name);
    expect(response.body.short_name).toBe(shortName);
    expect(response.body.userId).toBe(userDb.id);

  });

  it.skip('should be get all categories', async () => {

    const numberCategories = 5;
    await userFactory.createMany('User', numberCategories);

    const response = await request(app).get('/users');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.length).toBe(numberCategories);

  });

  it.skip('should be update an exist user', async () => {
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

  it.skip('should be delete an user', async () => {
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

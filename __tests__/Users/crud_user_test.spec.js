const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const User = require('../../Models').User;
const userFactory = require('../../Factories/UserFactory');
// const {matchers} = require('jest-json-schema');
// expect.extend(matchers);

describe('CRUD de usuarios', () => {
  beforeAll(async () => {
    await sequelize.sync({force: true});
  });

  it('should be create a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.lastName).toBe(newUser.lastName);
    expect(response.body.email).toBe(newUser.email);

  });

  it('should be get all users', async () => {
    const response = await request(app).get('/users');
    const usersInDB = await User.findAll();
    // expect(usersInDB.length).toBe(0);

    const numberUsers = 5;
    await userFactory.createMany('User', numberUsers);
    // console.log({response: response.body});
    const schema = {
      $id: 'testSchema',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    };

    console.log({'requestLength': response.body.length});

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(numberUsers);
    expect(response[0]).toMatchSchema(schema);

  });

  it.skip('should be update an exist user', async () => {
    const response = await request(app).put('/api/users/1').send({
      firstName: 'Jane',
    });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Jane');

  });

  it.skip('should be delete an user', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.status).toBe(204);
  });
});

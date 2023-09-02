const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');

beforeAll(async () => {
  await sequelize.sync({force: true});
});

describe('CRUD de usuarios', () => {
  it('should be create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    });

    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe('John');
  });

  it('should be get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
  });

  it('should be update an exist user', async () => {
    const response = await request(app).put('/api/users/1').send({
      firstName: 'Jane',
    });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Jane');

  });

  it('should be delete an user', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.status).toBe(204);
  });
});

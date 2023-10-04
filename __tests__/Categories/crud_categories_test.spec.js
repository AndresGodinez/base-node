const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const User = require('../../Models').User;
const Category = require('../../Models').Category;
const userFactory = require('../../Factories/UserFactory');
const categoryFactory = require('../../Factories/CategoryFactory');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../../Utils/UtilsCrypto');

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
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@mail.com',
      password,
    };

    const token = await jwt.sign({
      user: userLine,
    }, process.env.SECRET_KEY);

    const userDb = await User.create(userLine);

    const usersOnDb = await User.findAll();
    expect(usersOnDb.length).toBe(1);

    const shortName = newCategory.name.substring(0, 4);
    const response = await request(app).
        post('/categories').
        set('Authorization', `Bearer ${token}`).
        send(newCategory);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.name).toBe(newCategory.name);
    expect(response.body.short_name).toBe(shortName);
    expect(response.body.userId).toBe(userDb.id);

  });

  it('should be get all categories and user reference', async () => {

    const numberCategories = 5;
    await categoryFactory.createMany('Category', numberCategories);

    const response = await request(app).get('/categories');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.length).toBe(numberCategories);
    expect(response.body.length).toBe(numberCategories);
    response.body.forEach((category) => {
      expect(category).hasOwnProperty('name');
      expect(category).hasOwnProperty('short_name');
      expect(category).hasOwnProperty('user');
    });

  });

  it('should be possible to update it by the user who owns that category',
      async () => {
        const numberCategories = 2;
        await categoryFactory.createMany('Category', numberCategories);

        const usersOnDb = await User.findAll();
        expect(usersOnDb.length).toBe(2);

        const categoriesOnDB = await Category.findAll();
        expect(categoriesOnDB.length).toBe(2);

        const userLine = await User.findByPk(1);
        console.log({userLine});
        console.log({name:userLine.firstName});

        const token = await jwt.sign({
          user: userLine,
        }, process.env.SECRET_KEY);

        console.log({token});


        const response = await request(app).
            put('/categories/1').
            set(`Authorization`, `Bearer ${token}`).
            send({
              name: 'Updated Name',
            });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.name).toBe('Updated Name');

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

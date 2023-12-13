const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const UserModel = require('../../Models').User;
const CategoryModel = require('../../Models').Category;
const userFactory = require('../../Factories/UserFactory');
const categoryFactory = require('../../Factories/CategoryFactory');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../../Utils/UtilsCrypto');
const {setup} = require('../UtilsTest/truncateTables');
const {AuthUserToken} = require('../UtilsTest/AuthUtils');

describe('CRUD Categories', () => {

  beforeEach(async () => {
    await setup();

  });

  it('should be create a new category', async () => {
    const newCategory = {
      name: 'Name of category',
    };
    const authUser = await AuthUserToken();

    const usersOnDb = await UserModel.findAll();
    expect(usersOnDb.length).toBe(1);

    const shortName = newCategory.name.substring(0, 4);

    const response = await request(app).
        post('/categories').
        set('Authorization', `Bearer ${authUser.token}`).
        send(newCategory);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.name).toBe(newCategory.name);
    expect(response.body.short_name).toBe(shortName);
    expect(response.body.userId).toBe(authUser.userDb.id);

  });

  it('should be to get all categories and user reference if you are the owner',
      async () => {

        const authUser = await AuthUserToken();

        const usersOnDb = await UserModel.findAll();

        expect(usersOnDb.length).toBe(1);

        const numberCategories = 5;
        await categoryFactory.createMany('Category', numberCategories);

        const firstCategory = await CategoryModel.findByPk(1);

        await firstCategory.update({
              userId: authUser.userDb.id,
            },
        );

        const response = await request(app).get('/categories').
            set('Authorization', `Bearer ${authUser.token}`);

        expect(response.status).toBe(StatusCodes.OK);
        console.log({response: response.body});

        const numberCategoriesByUser = await CategoryModel.findAll(
            {
              where:
                  {UserId: authUser.userDb.id},
            },
        );

        expect(response.body.length).toBe(numberCategoriesByUser.length);
        response.body.forEach((category) => {
          expect(category).hasOwnProperty('name');
          expect(category).hasOwnProperty('short_name');
          expect(category).hasOwnProperty('user');
        });

      });

  it('should be possible to update it by the user who owns that category',
      async () => {
        const authUser = await AuthUserToken();
        const numberCategories = 2;
        await categoryFactory.createMany('Category', numberCategories);

        const usersOnDb = await UserModel.findAll();
        expect(usersOnDb.length).toBe(3);
        const categoriesOnDB = await CategoryModel.findAll();
        expect(categoriesOnDB.length).toBe(2);

        const firstCategory = await CategoryModel.findByPk(1);
        await firstCategory.update({
          userId: authUser.userDb.id,
        });

        const response = await request(app).
            put('/categories/1').
            set('Authorization', `Bearer ${authUser.token}`).
            send({
              name: 'Updated Name',
            });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.name).toBe('Updated Name');

      });

  it('should be not possible to update an category if you do not are the owner',
      async () => {
        const authUser = await AuthUserToken();
        const numberCategories = 2;
        await categoryFactory.createMany('Category', numberCategories);

        const response = await request(app).
            put('/categories/1').
            set('Authorization', `Bearer ${authUser.token}`).
            send({
              name: 'Updated Name',
            });

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);

      });

  it('you should be able to delete a category if it is the user own category.',
      async () => {
        const authUser = await AuthUserToken();
        await categoryFactory.create('Category');

        const firstCategory = await CategoryModel.findByPk(1);
        await firstCategory.update({
          userId: authUser.userDb.id,
        });

        const response = await request(app).delete('/categories/1').
            set('Authorization', `Bearer ${authUser.token}`);

        expect(response.status).toBe(StatusCodes.NO_CONTENT);
      });
});

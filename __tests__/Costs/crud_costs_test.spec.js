const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const UserModel = require('../../Models').User;
const CategoryModel = require('../../Models').Category;
const CostModel = require('../../Models').Cost;
const userFactory = require('../../Factories/UserFactory');
const categoryFactory = require('../../Factories/CategoryFactory');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../../Utils/UtilsCrypto');
const {setup} = require('../UtilsTest/truncateTables');
const {AuthUserToken} = require('../UtilsTest/AuthUtils');
const costFactory = require('../../Factories/CostFactory');

describe('Crud costs test', () => {
  beforeEach(async () => {
    await setup();
  });

  it('should be create a new cost', async () => {
    const authUser = await AuthUserToken();

    const category = await categoryFactory.create('Category');

    category.update(
        {userId: authUser.id},
    );

    const newCost = {
      name: 'Name of category',
      amount: 50,
      category_id: category.id,
    };

    const response = await request(app).
        post('/costs').
        set('Authorization', `Bearer ${authUser.token}`).
        send(newCost);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.name).toBe(newCost.name);
    expect(response.body.amount).toBe(newCost.amount);
    expect(response.body.categoryId).toBe(newCost.category_id);

  });

  it('should be update a cost', async () => {
    const authUser = await AuthUserToken();

    const cost = await costFactory.create('Cost');

    cost.update(
        {userId: authUser.userDb.id},
    );

    const dataToUpdate = {
      name: 'name update',
      amount: 2,
    };

    const response = await request(app).
        put(`/costs/${cost.id}`).
        set('Authorization', `Bearer ${authUser.token}`).
        send(dataToUpdate);

    const dataOnDb = await CostModel.findByPk(cost.id);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.name).toBe(dataToUpdate.name);
    expect(response.body.amount).toBe(dataToUpdate.amount);
    expect(dataOnDb.name).toBe(dataToUpdate.name);
    expect(dataOnDb.amount).toBe(dataToUpdate.amount);

  });

  it('should be delete a cost if you are the owner', async () => {
    const authUser = await AuthUserToken();

    const cost = await costFactory.create('Cost');

    cost.update(
        {userId: authUser.userDb.id},
    );

    const response = await request(app).
        delete(`/costs/${cost.id}`).
        set('Authorization', `Bearer ${authUser.token}`);
    const dataOnDb = await CostModel.findByPk(cost.id);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
    expect(dataOnDb).toBeNull();

  });

  it('should be show a cost if you are the owner', async () => {
    const authUser = await AuthUserToken();

    const cost = await costFactory.create('Cost');
    const cost2 = await costFactory.create('Cost');

    cost.update(
        {userId: authUser.userDb.id},
    );
    cost2.update(
        {userId: authUser.userDb.id},
    );

    const cost3 = await costFactory.create('Cost');
    const cost4 = await costFactory.create('Cost');

    const response = await request(app).
        get(`/costs`).
        set('Authorization', `Bearer ${authUser.token}`);

    console.log({response: response.body});

    expect(response.status).toBe(StatusCodes.OK);

    expect(response.body.length).toBe(2);
    expect(response.body).not.toEqual(
        expect.arrayContaining([cost3, cost4]),
    );

  });
});

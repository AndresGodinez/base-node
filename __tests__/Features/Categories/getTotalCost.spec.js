const request = require('supertest');
const {app} = require('../../defaultConfig');
const {AuthUserToken} = require('../../UtilsTest/AuthUtils');
const {setup} = require('../../UtilsTest/truncateTables');
const CostModel = require('../../../Models').Cost;
const CostFactory = require('../../../Factories/CostFactory');
const CategoryFactory = require('../../../Factories/CategoryFactory');
const UserFactory = require('../../../Factories/UserFactory');

describe('Features Categories', () => {
  beforeEach(async () => {
    await setup();
  });

  it('should be get total costs by category', async () => {
    const authUser = await AuthUserToken();
    const lengthCosts = 7;

    const costs = await CostFactory.createMany('Cost', lengthCosts, {
      userId: authUser.userDb.id,
      amount: 40,
    });

    const secondCost = await CostFactory.create('Cost', {
      userId: authUser.userDb.id,
      amount: 100,
      categoryId: 1,
    });

    const totalCosts = await CostModel.findAll({
      where: {
        userId: authUser.userDb.id,
      },
    });

    expect(totalCosts.length).toBe(8);

    const response = await request(app).
        get(`/categories/total/`).
        set('Authorization', `Bearer ${authUser.token}`);

    const totalCostsDB = await CostModel.findAll({
      where: {
        userId: authUser.userDb.id,
        categoryId: 1,
      },
    });

    const body = response.body;

    expect(response.body.length).toBe(7);

    const totalAmount = totalCostsDB.reduce((sum, cost) => sum + cost.amount,
        0);
    const firstCategory = body.find(element => element.categoryId === 1);
    const restElements = body.filter(element => element.categoryId !== 1);
    expect(firstCategory.amount).toBe(totalAmount);

    restElements.forEach((element) => {
      expect(element.amount).toBe(40);
    });

    const arrNames = [];

    costs.forEach(cost => {
      arrNames.push(cost.name);
    });

    arrNames.forEach(categoryName => {
      expect(body.includes(categoryName));
    });

  });

});

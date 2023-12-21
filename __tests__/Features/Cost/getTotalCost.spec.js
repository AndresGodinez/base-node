const request = require('supertest');
const {app} = require('../../defaultConfig');
const {AuthUserToken} = require('../../UtilsTest/AuthUtils');
const {setup} = require('../../UtilsTest/truncateTables');
const CostModel = require('../../../Models').Cost;
const CostFactory = require('../../../Factories/CostFactory');
const CategoryFactory = require('../../../Factories/CategoryFactory');
const UserFactory = require('../../../Factories/UserFactory');

describe('Features costs', () => {
  beforeEach(async () => {
    await setup();
  });

  it('should be get total costs', async () => {
    const authUser = await AuthUserToken();
    const lengthCosts = 5;

    const costs = await CostFactory.createMany('Cost', lengthCosts, {
      userId: authUser.userDb.id,
      amount: 120,
    });

    const totalCosts = await CostModel.findAll({
      where: {
        userId: authUser.userDb.id,
      },
    });

    expect(totalCosts.length).toBe(lengthCosts);

    const response = await request(app).
        get(`/costs/total`).
        set('Authorization', `Bearer ${authUser.token}`);

    expect(response.body.total).toBe(600);

  });

});

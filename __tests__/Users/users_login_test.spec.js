const request = require('supertest');
const {app, sequelize, StatusCodes} = require('../defaultConfig');
const User = require('../../Models').User;
const userFactory = require('../../Factories/UserFactory');
const {hashPassword} = require('../../Utils/UtilsCrypto');
// const {matchers} = require('jest-json-schema');
// expect.extend(matchers);

describe('Users login', () => {

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

  it('should be get JWT token', async () => {
    let user = await userFactory.create('User');
    const totalUsersOnDb = await User.findAll();
    expect(totalUsersOnDb.length).toBe(1);

    const customPassword = 'custom password';
    user.password = await hashPassword(customPassword);
    user.save();
    user = await user.reload();

    const credentials = {
      email: user.email,
      password: customPassword,
    };

    console.log({credentials});

    const response = await request(app).post('/auth/login').send(credentials);

    expect(response.status).toBe(StatusCodes.OK);

    const {token} = response.body;

    expect(token).toBeDefined();
  });
});

'use strict';

/** @type {import('sequelize-cli').Migration} */
const userFactory = require('../Factories/UserFactory');
const categoryFactory = require('../Factories/CategoryFactory');
const costFactory = require('../Factories/CostFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    // await userFactory.createMany('User', 10);
    // await categoryFactory.createMany('Category', 10);
    await costFactory.createMany('Cost', 10);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Costs', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};

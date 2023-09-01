const {factory} = require('factory-girl');
const {faker} = require('@faker-js/faker');
const {Cost} = require('../models');

factory.define('Cost', Cost, {
  name: () => faker.person.firstName(),
  amount: () => faker.finance.amount(),
  userId: factory.assoc('User', 'id'),
  categoryId: factory.assoc('Category', 'id'),
});

module.exports = factory;

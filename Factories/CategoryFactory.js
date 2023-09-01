const {factory} = require('factory-girl');
const {faker} = require('@faker-js/faker');
const {Category} = require('../models');

factory.define('Category', Category, {
  name: () => faker.person.firstName(),
  short_name: () => faker.person.jobTitle().substring(0,4),
  userId: factory.assoc('User', 'id'),
});

module.exports = factory;

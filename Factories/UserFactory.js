const {factory} = require('factory-girl');
const {faker} = require('@faker-js/faker');
const {User} = require('../models');

factory.define('User', User, {
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  email: () => faker.internet.email(),
});

module.exports = factory;

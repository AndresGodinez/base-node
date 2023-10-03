const {factory} = require('factory-girl');
const {faker} = require('@faker-js/faker');
const {User} = require('../models');
const {hashPassword} = require('../Utils/UtilsCrypto');

factory.define('User', User, {
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  email: () => faker.internet.email(),
  password: async () => {
    const password = faker.internet.password();
    return await hashPassword(password);
  },
});

module.exports = factory;

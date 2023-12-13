const {sequelize} = require('../defaultConfig');
const {hashPassword} = require('../../Utils/UtilsCrypto');
const jwt = require('jsonwebtoken');
const {User: UserModel} = require('../../Models');

class AuthUtils {
  static async AuthUserToken() {
    try {
      const simplePassword = 'simple Password';
      const password = await hashPassword(simplePassword);
      const userLine = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@mail.com',
        password,
      };

      const token = await jwt.sign({
        user: userLine,
      }, process.env.SECRET_KEY);

      const userDb = await UserModel.create(userLine);

      return {userDb, token};

    } catch (e) {
      console.log('Can not be created user ');
      console.log({e});

    }

  }

}

module.exports = AuthUtils;


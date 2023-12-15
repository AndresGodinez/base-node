const bcrypt = require('bcryptjs');

class UtilsCrypto {
  static async hashPassword(password) {
    try {
      return await bcrypt.hash(password, 10);

    } catch (e) {
      console.log('error hashing password');
      console.log({e});
    }

  }

  static async compare(password, passwordHashed) {
    try {
      return await bcrypt.compare(password, passwordHashed);

    } catch (e) {
      console.log('error comparing password');
      console.log({e});

    }

  }
}

module.exports = UtilsCrypto;

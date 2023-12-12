const {sequelize} = require('../defaultConfig');

class TruncateTables {
  static async setup() {
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

      await sequelize.query('TRUNCATE TABLE Costs');
      await sequelize.query('TRUNCATE TABLE Categories');
      await sequelize.query('TRUNCATE TABLE Users');

      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    } catch (e) {
      console.log('error comparing password');
      console.log({e});

    }

  }

}

module.exports = TruncateTables;


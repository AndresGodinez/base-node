'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {

    static associate(models) {
      Cost.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Cost.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
    }
  }

  Cost.init({
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cost',
  });
  return Cost;
};

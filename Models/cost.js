'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cost.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Cost.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }

  Cost.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cost',
  });
  return Cost;
};

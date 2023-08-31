'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      Category.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Category.hasMany(models.Cost, {
        foreignKey: 'CategoryId',
      });
    }
  }

  Category.init({
    name: DataTypes.STRING,
    short_name: DataTypes.STRING,
  }, {
    sequelize, modelName: 'Category',
  });
  return Category;
};

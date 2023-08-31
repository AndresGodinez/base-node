'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Category, {
        foreignKey: "userId"
      });
      User.hasMany(models.Cost, {
        foreignKey: "CostId"
      });
      User.hasMany(models.Revenue, {
        foreignKey: "CostId"
      });
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

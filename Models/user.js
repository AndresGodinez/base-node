'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      return values;
    }

    static associate(models) {
      User.hasMany(models.Category, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Cost, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Revenue, {
        foreignKey: 'userId',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

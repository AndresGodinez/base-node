'use strict';
const {Model} = require('sequelize');
const {verify} = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toJSON() {
      const values = {...this.get()};
      delete values.password;
      return values;
    }

    static getAuthUser(authorization) {
      const token = authorization.replace('Bearer ', '');
      const decodedToken = verify(token, process.env.SECRET_KEY);
      return decodedToken.user;
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
      type: DataTypes.STRING,
      allowNull: false,
      visible: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

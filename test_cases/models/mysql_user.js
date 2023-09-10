'use strict';
const { Model,Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {};
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    name:{
      type:Sequelize.DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "Name is required"},
        notEmpty: {msg: "Name cannot be empty"},
      }
    },
    age:{
      type:Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    //define table name
    tableName: 'users',
    modelName: 'User',
  });
  return User;
}


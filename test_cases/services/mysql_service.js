const { Sequelize } = require('sequelize');
const User = require('../models/sql_user');
const connectDb = async (host , user ,password,database) => {
    const sequelize = new Sequelize( database, user, password, {
        host: host,
        dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
      });
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
const addNewUser = async (inuser) => {
    const user = User.build({ name: inuser.name,age : inuser.age });
    await user.save();
}
const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
}
module.exports = {connectDb, addNewUser, getAllUsers}
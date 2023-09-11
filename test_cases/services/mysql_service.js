const { Sequelize } = require('sequelize');
const UserModel = require('../models/mysql_user');
const sequelize = {}
const getSequelize = () => {return sequelize}

const initDB = (host , user ,password,database,dialect,storage)  => {
  let lsequelize;
  if(dialect == 'sqlite') {
    lsequelize = new Sequelize('sqlite::memory:',{logging :false});
  }else {
    lsequelize = new Sequelize( database, user, password, {
      host: host,
      dialect: dialect, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
      storage : storage,
      logging:false
    });
  }
  initModels(lsequelize)
  lsequelize.sync()  
  Object.assign(sequelize,lsequelize)  
  return lsequelize;
}

const initModels = (sequelize) => {
   UserModel(sequelize)
}
const connectSDb = async (host , user ,password,database,dialect,storage) => {
      const sequelize = initDB(host , user ,password,database,dialect, storage)
      try {
        await sequelize.authenticate();
        return sequelize
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return null;
      }
}
const addNewUser = async (inuser) => {
  try{
    const user = await sequelize.models.User.create({ name: inuser.name,age : inuser.age });
  }catch(error){
    console.log("addNewUser error: " + error.message)
  }
}
const getAllUsers = async () => {
  try {
    const users = await sequelize.models.User.findAll();
    return users;
  }catch(error){
    console.log("getAllUsers error: " + error.message)
  }
}
module.exports = {connectSDb, addNewUser, getAllUsers}
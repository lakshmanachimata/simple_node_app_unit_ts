const mongo = require('../repo/mongo_repo');
const mysql = require('../repo/mysql_repo');

require('dotenv').config();

const connectToDB = async (type) => {
  if(type === 'sql') {
    let sqlClient = await mysql.connectSDb(process.env.SQL_DBHOST, process.env.SQL_DBUSER, process.env.SQL_DBPASSWORD, process.env.SQL_DBNAME, 'mysql','')
    if(!sqlClient) {
      console.error("SQL DB connection failed")
    }
    return sqlClient
  }else {
    let mongoClient = await mongo.connectMDb(process.env.MONGO_URL + '/' + process.env.DBNAME)
    if(!mongoClient) {
      console.error("Mongo DB connection failed")
    }
    return mongoClient
  }
}
const initDB = async () => { 
   let sqlClient =  await connectToDB('sql');
   let mongogClient = await connectToDB('mongo');
   if(sqlClient && mongogClient) {
    return true
   }
   return false
}

module.exports = {
    initDB
}
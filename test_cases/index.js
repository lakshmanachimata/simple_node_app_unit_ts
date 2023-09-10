const http = require('http');
const express = require('express');
const app = express();
const mongo = require('./services/mongo_service');
const mysql = require('./services/mysql_service');
require('dotenv').config();
const server = http.createServer(app);

const connectToDB = async (type) => {
  if(type === 'sql') {
    let sqlClient = await mysql.connectDb(process.env.SQL_DBHOST, process.env.SQL_DBUSER, process.env.SQL_DBPASSWORD, process.env.SQL_DBNAME, 'mysql','')
    if(!sqlClient) {
      console.error("SQL DB connection failed")
    }
    // server.listen(process.env.PORT, process.env.HOST, () => {
    //   console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
    // });
    return sqlClient
  }else {
    let mongoClient = await mongo.connectDb(process.env.MONGO_URL + '/' + process.env.DBNAME)
    if(!mongoClient) {
      console.error("Mongo DB connection failed")
    }
    server.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
    });
    return mongoClient
  }
}

const initSQL = async () => {
  await connectToDB('sql');
  await mysql.addNewUser({name : "lakshmana", age : 40})
  const users = await mysql.getAllUsers()
  console.log("users are ")
}
const initMongo = async () => {
  await connectToDB('mongo');
  await mongo.addNewUser({name : "lakshmana", age : 40})
  const users = await mongo.getAllUsers()
  console.log("users are ")
}
initSQL();
initMongo();



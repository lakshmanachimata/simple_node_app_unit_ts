const http = require('http');
const express = require('express');
const app = express();
const mongo = require('./services/mongo_service');
const mysql = require('./services/mysql_service');
require('dotenv').config();
const server = http.createServer(app);

const connectToDB = async () => {
  if(process.env.DBTYPE === 'sql') {
    let sqlClient = await mysql.connectDb(process.env.SQL_DBHOST, process.env.SQL_DBUSER, process.env.SQL_DBPASSWORD, process.env.SQL_DBNAME)
    if(!sqlClient) {
      console.error("SQL DB connection failed")
    }
    server.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
    });
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

const initAndAdd = async () => {
  await connectToDB();
  mysql.addNewUser({name : "lakshmana", age : 40})
}
initAndAdd();

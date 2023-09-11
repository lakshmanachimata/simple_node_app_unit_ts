const http = require('http');
const express = require('express');
const { initDB } = require('./database/database');
const { initRoutes } = require('./routes/routes');
const app = express();
require('dotenv').config();

const initSetup = async() => {
  await initDB()
  await initRoutes(app)
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log("server listening on port " + process.env.PORT)
    return app;
  });
};

initSetup();

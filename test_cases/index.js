const http = require('http');
const express = require('express');
const { initDB } = require('./database/database');
const { initRoutes } = require('./routes/routes');
const app = express();

const swaggerDocs = require("./swagger");


require('dotenv').config();

const initSetup = async() => {
  await initDB()
  await initRoutes(app)
  await swaggerDocs(app); // Initialize Swagger
  app.use('/', (req, res) => {
    res.json({ message: 'Welcome to the User API' });
  });
  app.use((req, res, next) => {
    res.status(404).json({ status: 404, error: 'Not Found', message: {} });
  });
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log("server listening on port " + process.env.PORT)
    return app;
  });
};

initSetup();

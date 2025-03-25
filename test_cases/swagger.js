const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Users API",
    version: "1.0.0",
    description: "API for managing users",
  },
  servers: [{ url: "http://localhost:" + process.env.PORT }],
};

const options = {
  swaggerDefinition,
  apis: ["./controllers/common_controller.js", "./controllers/user_controller.js"], // Path to API routes
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
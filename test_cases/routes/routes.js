const express = require('express');
const bodyParser = require('body-parser');
const { validateuserapi } = require('./routevalidation');


const initRoutes = async (app) => {
    const router = express.Router();
    app.use(router);
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(function (err, req, res, next) {
        if (err) {
            if(err.status >= 400 && err.status < 500) {
                return res.status(err.status).json({ status: err.status, error :  err.message, message : {} });
            }else {
                return res.status(500).json({ status: 500, error : 'Server Error', message : {} });
            }
        } else {
          next();
        }
    });
    app.use('/api/v1/user/', validateuserapi)
    require("../controllers/common_controller")(app)
    require("../controllers/user_controller")(app)
}

module.exports = { initRoutes }
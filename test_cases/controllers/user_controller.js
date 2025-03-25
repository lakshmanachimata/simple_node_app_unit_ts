const { validate } = require("express-validation")
const usersvc = require("../services/user_service")
const { adduservalidate } = require("./user_payload_validator")
const Joi = require("joi")

module.exports = function (app) {

/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         age:
 *           type: integer
 *           description: User age
 *      example:
 *          name: "John"
 *          age: 30
 */
    /**
     * @swagger
     * /api/v1/user/adduser:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - age
     *             properties:
     *               name:
     *                 type: string
     *                 description: User name
     *               age:
     *                 type: integer
     *                 description: User age
     *     responses:
     *       200:
     *         description: User created successfully
     */
    app.route('/api/v1/user/adduser').post(async (req, res) => {

        const { userdata , error = ""} =  await usersvc.addNewUser(req.body,1)
        if(userdata) {
            return res.status(200).json({status : 1})
        }else {
            return res.status(200).json({status : 0, message : error.message? error.message : "error"})
        }
    })
     /**
     * @swagger
     * /api/v1/user/getusers:
     *   get:
     *     summary: Get All Users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: get all users
     */

    app.route('/api/v1/user/getusers').get(async (req, res) => {
       const { users , error = ""}  =  await usersvc.getAllUsers(1)
       if(users) {
            return res.status(200).json({users : users, message : "success"})
       } else {
            return res.status(200).json({users :[], message : error.message? error.message : "error"})
       }
    })
}




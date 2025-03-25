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

        const user =  await usersvc.addNewUser(req.body,1)
        if(user) {
            return res.status(200).json({status : 1, user : user, message: "success"})
        }else {
            return res.status(200).json({status : 0, user : undefined, message: "not able to create user"})
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
            return res.status(200).json({status : 1, users : users, message : "success"})
       } else {
            return res.status(200).json({status : 0, users : undefined, message : "not able to get users"})
       }
    })

    /**
     * @swagger
     * /api/v1/user/updateuser:
     *   put:
     *     summary: Update a  user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id 
     *               - name
     *               - age
     *             properties:
     *               id:
     *                 type: integer
     *                 description: User id
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
    app.route('/api/v1/user/updateuser').put(async (req, res) => {
        const user =  await usersvc.updateUser(req.body,1)
        if(user) {
            return res.status(200).json({status : 1, user : user, message: "success"})
        }else {
            return res.status(200).json({status : 0, user : undefined, message: "user not found"})
        }
    })

/**
 * @swagger
 * /api/v1/user/deleteuser/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 */

    app.route('/api/v1/user/deleteuser/:id').delete(async (req, res) => {
        const user  =  await usersvc.deleteUser(req.params.id,1)
        if(user) {
             return res.status(200).json({status : 1, user : user, message : "success"})
        } else {
             return res.status(200).json({status : 0, user : undefined, message : "not able to delete user"})
        }
     })

}




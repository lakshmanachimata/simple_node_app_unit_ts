const { validate } = require("express-validation")
const usersvc = require("../services/user_service")
const { adduservalidate } = require("./user_payload_validator")

module.exports = function (app) {
    app.route('/api/v1/user/adduser', [validate(adduservalidate)]).post(async (req, res) => {
        const { userdata , error = ""} =  await usersvc.addNewUser(req.body,1)
        if(userdata) {
            return res.status(200).json({status : 1})
        }else {
            return res.status(200).json({status : 0, message : error.message? error.message : "error"})
        }
    })
    app.route('/api/v1/user/getusers').get(async (req, res) => {
       const { users , error = ""}  =  await usersvc.getAllUsers(1)
       if(users && users.length > 0) {
            return res.status(200).json({users : users, message : "success"})
       } else {
            return res.status(200).json({users :[], message : error.message? error.message : "error"})
       }
    })
}




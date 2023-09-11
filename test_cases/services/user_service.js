const SQLUserSvc = require('../repo/mysql_repo');
const MongoUserSvc = require('../repo/mongo_repo');

const getAllUsers = async(dbtype) => {
    if(dbtype == 1) {
        return await SQLUserSvc.getAllUsers()
    }else {
        return await MongoUserSvc.getAllUsers()
    }
}
const addNewUser = async(user,dbtype) => {
    if(dbtype == 1) {
       return await SQLUserSvc.addNewUser(user)
    }else {
       return await MongoUserSvc.addNewUser(user)
    }
}
module.exports = {addNewUser, getAllUsers}
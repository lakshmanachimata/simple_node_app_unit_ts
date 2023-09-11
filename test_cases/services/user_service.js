const SQLUserSvc = require('../repo/mysql_repo');
const MongoUserSvc = require('../repo/mongo_repo');

const getAllUsers = async(dbtype) => {
    if(dbtype == 1) {
        const users = await SQLUserSvc.getAllUsers()
        return users;
    }else {
        const users = await MongoUserSvc.getAllUsers()
        return users;
    }
}
const addNewUser = async(user,dbtype) => {
    if(dbtype == 1) {
        await SQLUserSvc.addNewUser(user)
    }else {
        await MongoUserSvc.addNewUser(user)
    }
}
module.exports = {addNewUser, getAllUsers}
const SQLUserRepo = require('../repo/mysql_repo');
const MongoUserRepo = require('../repo/mongo_repo');

const getAllUsers = async(dbtype) => {
    if(dbtype == 1) {
        return await SQLUserRepo.getAllUsers()
    }else {
        return await MongoUserRepo.getAllUsers()
    }
}
const addNewUser = async(user,dbtype) => {
    if(dbtype == 1) {
       return await SQLUserRepo.addNewUser(user)
    }else {
       return await MongoUserRepo.addNewUser(user)
    }
}
module.exports = {addNewUser, getAllUsers}
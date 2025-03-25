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
       let uUser =  await SQLUserRepo.addNewUser(user)
       return uUser;
    }else {
       let uUser  = await MongoUserRepo.addNewUser(user)
       return uUser;
    }
}

const updateUser = async(user,dbtype) => {
    if(dbtype == 1) {
       let uUser =  await SQLUserRepo.updateUser(user)
       return uUser;
    }else {
       let uUser  = await MongoUserRepo.updateUser(user)
       return uUser;
    }
}

const deleteUser = async(id,dbtype) => {
    if(dbtype == 1) {
       let uUser =  await SQLUserRepo.deleteUser(id)
       return uUser;
    }else {
       let uUser  = await MongoUserRepo.deleteUser(id)
       return uUser;
    }
}

module.exports = {addNewUser, getAllUsers,updateUser, deleteUser}
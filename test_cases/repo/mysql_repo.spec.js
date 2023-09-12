const { addNewUser, connectSDb, getAllUsers } = require('./mysql_repo');
const User  = require('../models/mongo_user');
require('dotenv').config();


describe('SQL service', () => {
    let sqlClient;


    beforeAll(async () => {
        sqlClient = await connectSDb("" , "" ,"","testdb","sqlite","memory");
    });

    afterAll(async () => {
        await sqlClient.drop();
        await sqlClient.close();
    });

    afterEach(async () => {
        // await sqlClient.drop();
    });

    describe('SQL', () => {
        test('SQL DB Connection Success',() => {
            expect(sqlClient).not.toEqual(null);
        });
    });

    describe('Users', () => {
        test('Add new user and get all users', async () => {
            const user  = {
                name: 'Lakshmana',
                age:40
            }
        
            await addNewUser(user);
            await addNewUser(user);
            let users = await getAllUsers();
            expect(users.users.length).toBe(2);
        });
    });
});
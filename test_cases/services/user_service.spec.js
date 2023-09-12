const mongoose = require('mongoose');
const { connectMDb } = require('../repo/mongo_repo');
const { connectSDb } = require('../repo/mysql_repo');
const { addNewUser, getAllUsers } = require('./user_service');

require('dotenv').config();


describe('MongoDB service', () => {
    let mongoClient;

    beforeAll(async () => {
        mongoClient = await connectMDb(process.env.MONGO_URL + '/' + process.env.DBNAME);
    });

    afterAll(async () => {
        await mongoClient.connection.close();
    });

    afterEach(async () => {
        await mongoClient.connection.db.dropDatabase();
    });

    describe('MongoDB', () => {
        test('Mongo DB Connection Success',() => {
            expect(mongoClient.connection).not.toEqual(null);
        });
    });

    describe('Users add success', () => {
        test('Add new user and get all users', async () => {
            const user  = {
                name: 'Lakshmana',
                age:40
            }
        
            await addNewUser(user,2);
            await addNewUser(user,2);
            let users = await getAllUsers(2);
            expect(users.users.length).toBe(2);
        });
    });
});


describe('SQL service', () => {
    let sqlClient;

    const user  = {
        name: 'lakshmana',
        age: 40
    }

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


    describe('Users add success', () => {
        test('Add new user and get all users', async () => {
            const user  = {
                name: 'Lakshmana',
                age:40
            }        
            await addNewUser(user,1);
            await addNewUser(user,1);
            let users = await getAllUsers(1);
            expect(users.users.length).toBe(2);
        });
    });
});
const mongoose = require('mongoose');
const { addNewUser, connectMDb, getAllUsers } = require('./mongo_repo');
const User  = require('../models/mongo_user');
require('dotenv').config();


describe('MongoDB service', () => {
    let mongoClient;

    const user  = {
        name: 'Lakshmana',
        age:40
    }

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

    describe('Users', () => {
        test('Add new user and get all users', async () => {
            await addNewUser(user);
            await addNewUser(user);
            let users = await getAllUsers();
            expect(users.length).toBe(2);
        });
    });
});
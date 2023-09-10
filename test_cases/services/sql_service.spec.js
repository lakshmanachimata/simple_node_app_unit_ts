const { addNewUser, connectDb, getAllUsers } = require('./mysql_service');
const User  = require('../models/mongo_user');
require('dotenv').config();


describe('SQL service', () => {
    let sqlClient;

    const user  = {
        name: 'A brand new project',
        description: 'This is a project in my system.'
    }

    beforeAll(async () => {
        sqlClient = await connectDb(process.env.MONGO_URL + '/' + process.env.DBNAME);
    });

    afterAll(async () => {
        await sqlClient.close();
    });

    afterEach(async () => {
        await sqlClient.drop();
    });

    describe('SQL', () => {
        test('SQL DB Connection Success',() => {
            expect(sqlClient.connection).not.toEqual(null);
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
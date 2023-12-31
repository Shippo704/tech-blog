// import the required models
const {User} = require('../models');

// user seeds
const users = [
    {
        username: 'user1',
        email: 'user1@email.com',
        password: 'pass1'
    },
    {
        username: 'user2',
        email: 'user2@email.com',
        password: 'pass2'
    },
    {
        username: 'user3',
        email: 'user3@email.com',
        password: 'pass3'
    },
    {
        username: 'user4',
        email: 'user4@email.com',
        password: 'pass4'
    },
    {
        username: 'user5',
        email: 'user5@email.com',
        password: 'pass5'
    }
];

// function to seed the user table
const seedUsers = () => User.bulkCreate(users);

// export the seed function
module.exports = seedUsers;
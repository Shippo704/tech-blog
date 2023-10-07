// import required packages and modules
const sequelize = require('../config/connection');

// import all the seeds
const seedUsers = require('./users');
const seedPosts = require('./posts');
const seedComments = require('./comments');

// seed the database function
const seedAll = async() => {
    // sync the models and wipe the tables
    await sequelize.sync({force: true});

    // seed the tables
    await seedUsers();
    await seedPosts();
    await seedComments();

    // exit with success code
    process.exit(0)
};

// call the function and seed the database
seedAll();
// import the required models
const {Comment} = require('../models');

// comment seeds
const comments = [
    {
        content: 'Comment 1',
        user_id: 2,
        post_id: 1
    },
    {
        content: 'Comment 2',
        user_id: 3,
        post_id: 2
    },
    {
        content: 'Comment 3',
        user_id: 4,
        post_id: 3
    },
    {
        content: 'Comment 4',
        user_id: 5,
        post_id: 4
    },
    {
        content: 'Comment 5',
        user_id: 1,
        post_id: 5
    },
    {
        content: 'Comment 6',
        user_id: 3,
        post_id: 1
    }
];

// function to seed the comment table
const seedComments = () => Comment.bulkCreate(comments);

// export the seed function
module.exports = seedComments;
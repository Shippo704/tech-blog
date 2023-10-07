// import models
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// define relationships between models

// user has many posts
// 1:N
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// user has many comments
// 1:N
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// post has many comments
// 1:N
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// export models
module.exports = {Comment, Post, User};
// import packages, models, and helpers
const router = require('express').Router();
const {Comment, Post, User} = require('../models');
const loggedIn = require('../utils/helpers');

// GET homepage
router.get('/', async (req, res) => {
    try {
        // get all posts to display on homepage
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"]
                } 
            ]
        });

        // convert post data into plain JS object
        const posts = postData.map((post) => post.get({plain:true}));

        // render dashboard with all posts
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// GET dashboard page
router.get('./dashboard', loggedIn, async (req, res) => {
    try {
        // find all posts by the user
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attribues: ["username"]
                }
            ]
        });

        // convert posts into plain JS object
        const posts = postData.map((post) => post.get({plain: true}));

        // render dashboard with all posts by user
        res.render('./dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// GET login page
router.get('./login', (req, res) => {
    // render login page
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
});

// GET signup page
router.get('./signup', (req, res) => {
    // render signup page
    res.render('signup', {
        loggedIn: req.session.loggedIn
    });
});

// GET post page by id
router.get('/post/:id', loggedIn, async (req, res) => {
    try {
        // get single post data
        // get associated username
        // get associated comments and the usernames for each comment
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["username"]
                        }
                    ]
                }
            ]
        });

        // convert post into plain JS object
        const post = postData.get({plain: true});

        // render the post page
        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router


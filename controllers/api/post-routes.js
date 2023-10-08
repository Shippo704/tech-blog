// import required packages and modules
const router = require('express').Router();
const {Comment, Post, User} = require('../../models');
const { update } = require('../../models/Comment');
const loggedIn = require('../../utils/auth');

// GET all posts from a user
router.get('/', async (req, res) => {
    try {
        // find all posts and their associated usernames
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });
        res.status(200).json(posts);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// GET one post by id
// include associated username
// include associated comments and their associated usernames
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(
            req.params.id,
            {
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
        
        // if the post doesn't exist
        if (!post) {
            res.status(404).json({message: 'This post does not exist'});
            return;
        }

        // post found successfully
        res.status(200).json(post);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// POST/CREATE new post with loggedIn user
router.post('/', loggedIn, async (req, res) => {
    try {
        // create a new post
        const newPost = await Post.create({
            // use req body data
            ...req.body,
            // user_id belongs to the logged in user
            user_id: req.session.user_id
        });

        // post created successfully
        res.status(200).json(newPost);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE/PUT a post by id with loggedIn user
router.put('/:id', loggedIn, async (req, res) => {
    try {
        // update a post with req body data
        const updatePost = await Post.update(req.body, {
            // update the post that matches params id
            where: {
                id: req.params.id
            }
        });

        // if post doesn't exist
        if (!updatePost) {
            res.status(404).json({message: 'This post does not exist'});
            return;
        }

        // post updated successfully
        res.status(200).json(updatePost);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// DELETE/DESTROY a post by id with loggedIn user
router.delete('/:id', loggedIn, async (req, res) => {
    try {
        // find and destroy all associated comments
        await Comment.destroy({
            where: {
                post_id: req.params.id
            }
        });

        // find and destroy a post with id that matches params
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        // if post doesn't exist
        if (!deletePost) {
            res.status(404).json({message: 'This post does not exist'});
        }

        // post deleted successfully
        res.status(200).json(deletePost);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// export the routes
module.exports = router;
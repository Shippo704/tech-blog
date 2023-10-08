// import required packages and modules
const router = require('express').Router();
const {Comment} = require('../../models');
const loggedIn = require('../../utils/auth');

// CREATE/POST new comment
router.post('/', loggedIn, async (req, res) => {
    try {
        // create a new comment with req body data
        const comment = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            // user_id is the logged in user's id
            user_id: req.session.user_id
        });

        // comment created successfully
        res.status(200).json(comment);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// DELETE/DESTROY a comment
router.delete('./:id', loggedIn, async (req, res) => {
    try {
        // delete comment that matches params id
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        // if comment doesn't exist
        if (!deleteComment) {
            res.status(404).json({message: 'This comment does not exist'});
        }

        // comment deleted successfully
        res.status(200).json(deleteComment);
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// export the router
module.exports = router;
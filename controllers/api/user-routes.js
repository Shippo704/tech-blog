// import required packages and modules
const router = require('express').Router();
const {User} = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        // get all users
        const users = await User.findAll({
            // exclude password because we don't want to display it
            attributes: {exclude: ['password']}
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// POST/CREATE new user
router.post('/signup', async (req, res) => {
    try {
        // create new user using req body data
        const newUser = await User.create(req.body);

        // save the session and automatically log in the new user
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// POST/CREATE new user session for login
router.post('/login', async (req, res) => {
    try {
        // find the data for the user who is trying to log in
        const userData = await User.findOne({
            // find by username (model says it should be unique, so it is searchable)
            where: {
                username: req.body.username
            }
        });

        // if username doesn't exist
        if (!userData) {
            res.status(400).json({message: 'This user does not exist'});
            return;
        }

        // check that password is correct using method from model
        const validPassword = await userData.checkPassword(req.body.password);

        // if password is wrong
        if (!validPassword) {
            res.status(400).json({message: 'Password is incorrect.'});
            return;
        }

        // if the username and password passed the checks
        // save the session with the user logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({userData, message: 'Login successful'})
        });
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// POST/CREATE session logout for user
router.post('/logout', (req, res) => {
    try {
        // if a user is logged in
        if (res.session.loggedIn) {
            // delete session to log them out
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
        // already logged out, session not found
        else {
            res.status(404).end();
        }
    }
    // catch all errors
    catch (error) {
        res.status(500).json(error);
    }
});

// export router
module.exports = router;
// middleware function to check if user is logged in
const loggedIn = (req, res, next) => {
    // if user is not logged in, redirect to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    else {
        next();
    }
}

module.exports = loggedIn;
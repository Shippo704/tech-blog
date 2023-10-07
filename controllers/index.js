// required packages and modules
const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

// set up the routes
router.use('./', homeRoutes);
router.use('./api', apiRoutes);

// export the router
module.exports = router;
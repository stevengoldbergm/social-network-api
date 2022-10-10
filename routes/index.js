// import router and api routes
const router = require('express').Router();
const apiRoutes = require('./api');

// Set api endpoint
router.use('/api', apiRoutes);

// If any endpoint is used aside from an API endpoint, send an error message to the page.
router.use((req, res) => {
    return res.send('This is a backend application. Please choose an appropriate route!');
});
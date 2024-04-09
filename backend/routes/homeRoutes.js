// backend/src/routes/homeRoutes.js

// Import the home controller
const homeController = require('../controllers/homeController');

// Create a function to set up routes related to the home page
function setupHomeRoutes(app) {
    // Define the base route for the home page
    app.use('/', homeController);
}

// Export the setupHomeRoutes function for use in the main app file (app.js)
module.exports = setupHomeRoutes;

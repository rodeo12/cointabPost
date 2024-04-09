// backend/routes/postRoutes.js

// Import required modules
const express = require('express');
const postController = require('../controllers/postController');

// Create a router instance
const router = express.Router();

// Define routes and corresponding controller methods

// GET route for the post page with a specific userId
router.get('/:userId', postController.getPostsByUserId);

// POST route to add a new post
router.post('/', postController.addPost);

// Export the router
module.exports = router;

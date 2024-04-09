// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const homeRoutes = require('./routes/homeRoutes');
const postRoutes = require('./routes/postRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.static('frontend')); // Serve static files from the frontend directory

// Routes
app.use('/', homeRoutes); // Home routes
app.use('/posts', postRoutes); // Post routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// backend/app.js

const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(express.json())

// Middleware

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.static('frontend')); // Serve static files from the frontend directory

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/user');

// Route to fetch all users from the API
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to add a new user to the database
router.post('/users/add', async (req, res) => {
  const { name, email, phone, website, city, company } = req.body;

  try {
    const newUser = await User.create({ name, email, phone, website, city, company });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Route to fetch a user by ID from the API
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = response.data;
      res.json(user);
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });
  
module.exports = router;

// backend/controllers/postController.js

// Import required modules
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const excelUtils = require('../utils/excelUtils');

// Placeholder for storing posts in memory (replace with database storage)
let posts = [];

// Function to fetch posts from the API based on userId
async function getPostsByUserId(req, res) {
    try {
        const { userId } = req.params;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const userData = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const { name, company } = userData.data;

        const fetchedPosts = response.data.map(post => ({
            id: uuidv4(),
            userId: post.userId,
            title: post.title,
            body: post.body,
            name,
            company: company.name
        }));

        posts = fetchedPosts; // Update posts in memory (replace with database storage)

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Function to add a new post
function addPost(req, res) {
    try {
        const { userId, title, body } = req.body;
        const newPost = { id: uuidv4(), userId, title, body };
        posts.push(newPost); // Add new post to memory (replace with database storage)

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Export controller methods
module.exports = {
    getPostsByUserId,
    addPost
};

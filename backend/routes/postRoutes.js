const express = require('express');
const axios = require('axios');
const ExcelJS = require('exceljs');
const router = express.Router();
const Post = require('../models/post');

// Route: GET /api/posts/:userId
// Description: Get all posts for a specific user
router.get('/api/posts/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch posts from API based on userId
    const apiResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = apiResponse.data;

    // Save fetched posts to the database
    await Promise.all(posts.map(async (post) => {
      await Post.create({
        title: post.title,
        body: post.body,
        userId: post.userId,
        company: post.company,
      });
    }));

    // Generate Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Posts');
    worksheet.columns = [
      { header: 'Title', key: 'title', width: 50 },
      { header: 'Body', key: 'body', width: 100 },
      { header: 'User ID', key: 'userId', width: 10 },
      { header: 'Company', key: 'company', width: 50 },
    ];

    posts.forEach(post => {
      worksheet.addRow({ title: post.title, body: post.body, userId: post.userId, company: post.company });
    });

    // Send Excel file as a response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="posts_${userId}.xlsx"`);
    await workbook.xlsx.write(res);

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

module.exports = router;

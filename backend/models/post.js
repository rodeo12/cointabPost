// models/post.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user');

const Post = db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;

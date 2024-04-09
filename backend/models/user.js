// Import Sequelize and database connection
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;

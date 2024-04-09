// backend/config/db.js

const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create a MySQL database connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust as needed
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Function to execute MySQL queries
function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.error('Error connecting to MySQL:', error);
                reject(error);
            } else {
                connection.query(query, params, (queryError, results) => {
                    connection.release(); // Release the connection
                    if (queryError) {
                        console.error('Error executing MySQL query:', queryError);
                        reject(queryError);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
}

module.exports = {
    pool,
    executeQuery
};

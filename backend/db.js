// Initiate connection to MySQL database
const mysql = require('mysql2')

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'Dummy',
    password: 'FURculita123', 
    database: 'popregdb'
});

// Export the pool
module.exports = pool.promise();
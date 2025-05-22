const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();


// |========================|
// |   REGISTERING A USER   |
// |========================|
// This route is used to register a new user.
// It receives a POST request with the user details in the request body.
// It then hashes the user's password using bcrypt and inserts the user details into the database using a SQL query.
// The route is accessible at the /register endpoint.
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// |========================|
// |   AUTHENTICATING USER  |
// |========================|
// This route is used to authenticate a user.
// It receives a POST request with the user's username and password in the request body.
// It queries the database to get the user with the specified username.
// If the user is found, it compares the hashed password with the password provided in the request.
// If the passwords match, it generates a JWT token with the user's ID and role and sends it as a response.
// The route is accessible at the /login endpoint.
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).send('Invalid username or password');
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the router so it can be used in the server.js file
module.exports = router;
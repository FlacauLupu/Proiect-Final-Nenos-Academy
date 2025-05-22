// This file is the entry point of the application. 
// It starts the server and listens on port 5000. 
// It also defines routes for the application and uses middleware to authenticate users.
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Start the server and listen on port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

// Define routes for the application
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const citizenRoutes = require('./routes/citizens');
app.use('/citizens', citizenRoutes);

// Import and use middleware
const authenticate = require('./middleware/auth');
app.use(authenticate);
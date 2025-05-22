// Importing jsonwebtoken
const jwt = require('jsonwebtoken');

// Defining the middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization'); // We check if the user has a valid token in the request header
    if (!token) {
        return res.status(401).send('Access denied'); // If there is no token we send a message
    }

    try {
        const verified = jwt.verify(token, 'secretkey'); // We try to verify the token
        req.user = verified; // If the token is valid, it decodes the token and sets the user object in the request object
        next();
    } catch (error) {
        res.status(400).send('Invalid token'); // If the verification fails send a message
    }
};

module.exports = authenticate; // Export the middleware
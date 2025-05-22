// Importing express and the db connection pool
const express = require('express');
const db = require('../db');

// We create an express router to define specific routes
const router = express.Router();

//  ========================
// |   ADDING A CITIZEN     |
//  ========================
// This route is used to add a citizen to the database.
// It receives a POST request with the citizen details in the request body.
// It then inserts the citizen details into the database using a SQL query.
router.post('/', async (req, res) => {
    const { first_name, last_name, birth_date, address, marital_status, citizenship } = req.body;

    if (!first_name || !last_name || !birth_date || !address || !marital_status || !citizenship) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO citizens (first_name, last_name, birth_date, address, marital_status, citizenship) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, birth_date, address, marital_status, citizenship]
        );
        res.status(201).json({ message: 'Citizen added successfully', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//  ========================
// |   GETTING CITIZENS     |
//  ========================
// This route is used to get all citizens from the database.
// It receives a GET request and queries the database to get all citizens.
// It then sends the list of citizens as a JSON response.
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM citizens');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  ========================
// |   UPDAING A CITIZEN    |
//  ========================
// This route is used to update a citizen in the database.
// It receives a PUT request with the citizen ID as a parameter and the updated details in the request body.
// It then updates the citizen details in the database using a SQL query.
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, birth_date, address, marital_status, citizenship } = req.body;

    if (!first_name || !last_name || !birth_date || !address || !marital_status || !citizenship) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await db.query(
            'UPDATE citizens SET first_name = ?, last_name = ?, birth_date = ?, address = ?, marital_status = ?, citizenship = ? WHERE id = ?',
            [first_name, last_name, birth_date, address, marital_status, citizenship, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Citizen not found' });
        }

        res.status(200).json({ message: 'Citizen updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//  ========================
// |   DELETING A CITIZEN   |
//  ========================
// This route is used to get a specific citizen from the database.
// It receives a GET request with the citizen ID as a parameter.
// It then queries the database to get the citizen with the specified ID.
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM citizens WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Citizen not found' });
        }

        res.status(200).json({ message: 'Citizen deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Export the router so it can be used in the server.js file
module.exports = router;
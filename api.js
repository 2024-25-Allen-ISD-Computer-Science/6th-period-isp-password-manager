const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());          // Allow cross-origin requests

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'phpmyadmin-passwords:3088',   // e.g. localhost or IP of the MySQL server
  user: '4%6%----089fijjda9813owl',  // Your MySQL username
  password: '4%6%----iud91731lam13895',  // Your MySQL password
  database: 'passwords' // Your database name
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Routes

// Example GET route to fetch all records from a table (e.g., 'users')
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed.' });
      return;
    }
    res.json(results);
  });
});

// Example POST route to add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  
  db.query(query, [name, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to insert data into database.' });
      return;
    }
    res.status(201).json({ message: 'User added successfully!', id: results.insertId });
  });
});

// Example PUT route to update a user's details
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

  db.query(query, [name, email, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update user data.' });
      return;
    }
    res.json({ message: 'User updated successfully.' });
  });
});

// Example DELETE route to remove a user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [id]

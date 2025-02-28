import express from 'express';
import cors from 'cors';
import db from './db.js'; // Use the db.js connection pool

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Example GET route to fetch all records from a table (e.g., 'users')
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed.' });
  }
});

// Example POST route to add a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';

  try {
    const [results] = await db.query(query, [name, email]);
    res.status(201).json({ message: 'User added successfully!', id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert data into database.' });
  }
});

// Example PUT route to update a user's details
app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

  try {
    await db.query(query, [name, email, id]);
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user data.' });
  }
});

// Example DELETE route to remove a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  try {
    await db.query(query, [id]);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

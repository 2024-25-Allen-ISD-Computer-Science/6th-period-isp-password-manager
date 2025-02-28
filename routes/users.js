import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js'; // Use the connection pool from db.js

const router = express.Router();

// Hash the password before saving it to the database
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword;
};

// Get all users (excluding the password for security)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, created_at FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed.' });
  }
});

// Get a user by ID (excluding the password for security)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT id, name, created_at FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed.' });
  }
});

// Create a new user (hash password before saving)
router.post('/', async (req, res) => {
  const { name, password } = req.body;

  // Hash the password
  const hashedPassword = await hashPassword(password);

  const query = 'INSERT INTO users (name, hashed_password) VALUES (?, ?)';
  try {
    const [results] = await db.query(query, [name, hashedPassword]);
    res.status(201).json({ message: 'User added successfully!', id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert data into database.' });
  }
});

// Update a user's details (hash new password if provided)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  // If password is provided, hash it
  let hashedPassword = null;
  if (password) {
    hashedPassword = await hashPassword(password);
  }

  const query = 'UPDATE users SET name = ?, hashed_password = ? WHERE id = ?';
  try {
    const [results] = await db.query(query, [name, hashedPassword, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user data.' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  try {
    const [results] = await db.query(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

export default router; // Exporting the router using ES module syntax

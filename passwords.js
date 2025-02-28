import db from '../db.js';  // Use the connection pool
import bcrypt from 'bcryptjs';  // Hashing (optional)
import CryptoJS from 'crypto-js';  // Decryption
import express from 'express';

const router = express.Router();

// Secret key used for encryption (must match the one in the frontend)
const secretKey = 'mySecretKey';

// POST route to store password
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Decrypt the password (if it was encrypted in the frontend)
  const decryptedPassword = CryptoJS.AES.decrypt(password, secretKey).toString(CryptoJS.enc.Utf8);

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

  const query = 'INSERT INTO passwords (username, password) VALUES (?, ?)';
  try {
    const [results] = await db.query(query, [username, hashedPassword]);
    res.status(201).json({ message: 'Password saved successfully!', id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save password.' });
  }
});

// Export the router for use in other parts of the application
export default router;

const express = require('express');
const db = require('../db');  // Connection pool
const bcrypt = require('bcryptjs');  // Hashing (optional)
const CryptoJS = require('crypto-js');  // Decryption
const router = express.Router();

// Secret key used for encryption (must match the one in the frontend)
const secretKey = 'mySecretKey';

// POST route to store password
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Decrypt the password (if it was encrypted in the frontend)
  const decryptedPassword = CryptoJS.AES.decrypt(password, secretKey).toString(CryptoJS.enc.Utf8);

  // You can either hash it or store it as it is (depending on your use case)
  const hashedPassword = await bcrypt.hash(decryptedPassword, 10); // Hash the password for storage

  const query = 'INSERT INTO passwords (username, password) VALUES (?, ?)';
  try {
    const [results] = await db.query(query, [username, hashedPassword]);
    res.status(201).json({ message: 'Password saved successfully!', id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save password.' });
  }
});

module.exports = router;

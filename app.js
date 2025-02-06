require('dotenv').config();
const express = require('express');
const db = require('./db'); 

const app = express();
const port = 3000;

app.use(express.json()); 

// Endpoints go here

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
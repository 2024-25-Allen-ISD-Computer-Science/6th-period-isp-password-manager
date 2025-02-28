require('dotenv').config();  // For loading environment variables
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');  // Import the users route

const app = express();
const port = 3000;

// Middleware
app.use(express.json());  // Body parser middleware for JSON
app.use(cors());          // Enable Cross-Origin Resource Sharing

// Use the users routes
app.use('/api/users', usersRouter);  // This links your routes

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

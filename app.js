import 'dotenv/config';  // For loading environment variables
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';  // Import the users route (with .js extension)

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

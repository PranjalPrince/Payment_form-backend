// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./structure'); // Import the User model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = 'your-mongodb-connection-string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('e  rror', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a route to handle form submissions
app.post('/submit-form', async (req, res) => {
  const formData = req.body;

  try {
    // Save the form data to the MongoDB database
    const newUser = new User(formData);
    await newUser.save();

    console.log('Form data saved to MongoDB:', newUser);

    // Respond with a success message
    res.json({ success: true, message: 'Form data received and saved successfully' });
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
    // Handle errors
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors'); // Import cors
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors()); // Use cors middleware

// GET route for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input. Please provide a valid array in the "data" field.',
    });
  }

  // Separate numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  // Find the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  // Example user details
  const userId = 'john_doe_17091999';
  const email = 'john@xyz.com';
  const rollNumber = 'ABCD123';

  res.status(200).json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

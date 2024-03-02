// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/user'); // Path to your User model
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: ['https://new-react-app-frontend.vercel.app', 'https://new-react-app-frontend.vercel.app/register', 'https://new-react-app-frontend.vercel.app/'], // Add your frontend URLs here
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://sumanbhawna11:DNt1VxI24qwg55Ns@clustere.kinkrie.mongodb.net/?retrywrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// // Define User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { name, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('Hashed password:', hashedPassword);


    const user = new User({ neme, email, password });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  console.log('Received login request:', req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Stored hashed password:', user.password);
    console.log('Is password valid?', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'rajna2378999##@679789fvg', {
      expiresIn: '1h', // Set the expiration time as needed
    });
    console.log('Generated token:', token);

    res.status(200).json({ message: 'Login successful', token }); // Include the token in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/user-data', async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'rajna2378999##@679789fvg');
    const userEmail = decodedToken.email;

    // Fetch user data based on the email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // You can customize the data you want to send to the frontend
    const userData = {
      email: user.email,
      name: user.name, // Add the 'name' property
      // Add other user data fields as needed
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

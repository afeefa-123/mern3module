// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = process.env.PORT || 8080;

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/farmstock', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Create a Mongoose schema and model for user data
// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   role: {
//     type: String,
//     enum: ['user', 'admin', 'seller'], // Allow 'user', 'admin', and 'seller'
//   },
// });

// const User = mongoose.model('User', userSchema);

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/register', async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword, role });
//     await user.save();

//     let successMessage = '';
//         if (role === 'user') {
//           successMessage = 'User registered successfully';
//         } else if (role === 'seller') {
//           successMessage = 'Seller registered successfully';
//         } else {
//           successMessage = 'Registration successful';
//         }
    
//         res.status(201).send(successMessage);
//       } catch (error) {
//         res.status(500).send('Error registering user');
//         console.log(error);
//       }
// });



// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(401).send('Invalid credentials');
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).send('Invalid credentials');
//   }

//   const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', {
//     expiresIn: '1h',
//   });

//   res.json({ token, role: user.role });
// });





// function verifyToken(req, res, next) {
//   const token = req.header('Authorization');

//   if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//   }

//   // Log the token for debugging purposes
//   console.log('Received token:', token);

//   try {
//       // Verify the token and decode its claims
//       const decodedToken = jwt.verify(token.replace('Bearer ', ''), 'your_secret_key');

//       // Assuming your token contains a 'userRole' claim
//       const userRole = decodedToken.userRole;
//       const userId = decodedToken.userId;

//       // Set the user role and ID in the request for use in the route handler
//       req.userRole = userRole;
//       req.userId = userId;

//       // Move to the next middleware or route
//       next();
//   } catch (error) {
//       console.error('Token verification error:', error);
//       return res.status(401).json({ message: 'Failed to authenticate token' });
//   }
// }


// app.get('/home', verifyToken, (req, res) => {
//     // Access the user's ID and role via req.userId and req.userRole
//     if (req.userRole === 'user') {
//       // Allow access to the user's home page
//       res.json({ message: 'Welcome to the user home page' });
//     } else if (req.userRole === 'admin') {
//       // Allow access to the admin's home page
//       res.json({ message: 'Welcome to the admin home page' });
//     } else if (req.userRole === 'seller') {
//       // Allow access to the seller's home page
//       res.json({ message: 'Welcome to the seller home page' });
//     } else {
//       // Handle unknown roles
//       res.status(401).send('Unknown role');
//     }
//   });
  
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/farmstock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema and model for user data
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'seller'],
  },
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    let successMessage = '';
    if (role === 'user') {
      successMessage = 'User registered successfully';
    } else if (role === 'seller') {
      successMessage = 'Seller registered successfully';
    } else {
      successMessage = 'Registration successful';
    }

    res.status(201).send(successMessage);
  } catch (error) {
    res.status(500).send('Error registering user');
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id, userRole: user.role }, 'secrete123', {
    expiresIn: '1h',
  });

  res.json({ token, role: user.role });
});

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), 'secrete123');

    req.userRole = decodedToken.userRole;
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
}

app.get('/home', verifyToken, (req, res) => {
  if (req.userRole === 'user') {
    res.json({ message: 'Welcome to the user home page' });
  } else if (req.userRole === 'admin') {
    res.json({ message: 'Welcome to the admin home page' });
  } else if (req.userRole === 'seller') {
    res.json({ message: 'Welcome to the seller home page' });
  } else {
    res.status(401).send('Unknown role');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

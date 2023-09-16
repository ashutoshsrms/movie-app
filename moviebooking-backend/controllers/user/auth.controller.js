const User = require('../../models/user.model');
const { v4: uuidv4 } = require('uuid'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

const signUp = async (req, res) => {
  try {
    const { email, firstName, lastName, contact, password } = req.body;
    const username = firstName.toLowerCase() + lastName.toLowerCase();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      username,
      contact,
      password: hashedPassword,
      role: 'user',
      isLoggedIn: false,
      coupens: [],
      bookingRequests: []
    });

    await newUser.save();

    // Generate and sign a JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
    console.log(err);
  }
}


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate and sign a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
      
      const userInfo={
      userId: user._id ,
      firstName: user.firstName,
      lastName:user.lastName,
      }

      res.status(200).json({ userInfo, token });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };


const logout = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isLoggedIn = false;
    await user.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = {
  signUp,
  login,
  logout
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route  POST /api/auth/signup
// @access Public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email: normalizedEmail, password });

    res.status(201).json({
      success: true,
      message: 'Account created!',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        streak: user.streak,
        solvedCount: user.solvedProblems.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    let isValidPassword = false;

    if (user) {
      const storedPassword = user.password || '';
      const isHashed = storedPassword.startsWith('$2');

      if (isHashed) {
        isValidPassword = await bcrypt.compare(password, storedPassword);
      } else {
        // Support legacy manually-created plaintext users, then migrate to hash.
        isValidPassword = password === storedPassword;
        if (isValidPassword) {
          user.password = password;
          await user.save();
        }
      }
    }

    if (!user || !isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        streak: user.streak,
        solvedCount: user.solvedProblems.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate('solvedProblems', 'title difficulty');
  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      streak: user.streak,
      solvedProblems: user.solvedProblems,
      solvedCount: user.solvedProblems.length,
    },
  });
};

module.exports = { signup, login, getMe };

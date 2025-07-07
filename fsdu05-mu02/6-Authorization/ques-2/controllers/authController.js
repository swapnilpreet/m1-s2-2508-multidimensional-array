const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateTokens } = require('../utils/tokenUtils');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role });
    res.status(201).json({ message: 'User registered' });
  } catch {
    res.status(400).json({ message: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
  return res.status(401).json({ message: 'Invalid credentials' });
  const tokens = generateTokens(user);
  res.json(tokens);
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Missing token' });
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const tokens = generateTokens(decoded);
    res.json(tokens);
  } catch {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/TokenBlacklist');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  const blacklisted = await BlacklistedToken.findOne({ token });
  if (blacklisted) return res.status(403).json({ message: 'Token is blacklisted' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(decoded.id);

    // Check for subscription expiration
    if (user.subscription.expiresAt && new Date() > user.subscription.expiresAt) {
      user.subscription = { plan: 'free' };
      await user.save();
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

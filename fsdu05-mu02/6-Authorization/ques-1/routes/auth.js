const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthRouter = express.Router();
 

AuthRouter.get('/github', passport.authenticate('github', { session: false }));


AuthRouter.get('/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/' }), (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, username: req.user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

module.exports = AuthRouter;

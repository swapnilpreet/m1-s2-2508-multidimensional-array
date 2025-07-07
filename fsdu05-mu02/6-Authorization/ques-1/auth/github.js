const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const UserModel = require('../models/user.model');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/api/auth/github/callback`,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    const existingUser = await UserModel.findOne({ githubId: profile.id });
    if (existingUser) return done(null, existingUser);

    const user = await UserModel.create({
      githubId: profile.id,
      username: profile.username,
      email: email || ''
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => UserModel.findById(id).then(user => done(null, user)));

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, unique: true },
  username: String,
  email: String,
});

const UserModel= mongoose.model('Usergithub', userSchema);
module.exports =UserModel;
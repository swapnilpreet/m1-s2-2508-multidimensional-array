const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const UserModel= mongoose.model('user-auth', userSchema);
module.exports=UserModel;
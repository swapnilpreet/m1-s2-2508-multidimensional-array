const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, trim: true, required: true },
  email: { type: String, unique: true, trim: true, required: true },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

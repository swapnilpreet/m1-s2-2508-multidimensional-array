const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  password: String,
  email: String,
  role: { type: String, enum: ["user", "admin", "chef"], default: "user" },
  resetToken: String,
  resetTokenExpiry: Date,
});

const UserModel = mongoose.model("User-Dish", UserSchema);
module.exports = UserModel;

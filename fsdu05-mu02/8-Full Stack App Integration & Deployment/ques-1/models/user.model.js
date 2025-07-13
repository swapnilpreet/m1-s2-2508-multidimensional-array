const mongoose = require("mongoose");
const { Profiler } = require("react");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    profile: {
      fullname: String,
      bio: String,
      avatar: String,
    },
  },
  { timestamps: true }
);


const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;
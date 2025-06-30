const mongoose = require("mongoose");
const validator = require("validator");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: { type: String, required: true, minlength: 6 },
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "profile" }],
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  title: String,
  author: String,
  status: { type: String, default: "available" },
  borrowerName: String,
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  overdueFees: { type: Number, default: 0 }
});

module.exports = mongoose.model("Library", librarySchema);

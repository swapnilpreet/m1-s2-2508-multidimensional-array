const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user-auth' }
});

const NoteModel= mongoose.model('Note', noteSchema);
module.exports =NoteModel;
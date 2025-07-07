const express = require('express');
const NoteModel = require('../models/note.model');
const authMiddleware = require('../middleware/authmiddleware');
const noteRoutes = express.Router();

noteRoutes.use(authMiddleware);

noteRoutes.post('/', async (req, res) => {
  try {
    const note = new NoteModel({ ...req.body, createdBy: req.user._id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: 'Error creating note' });
  }
});


noteRoutes.get('/', async (req, res) => {
  const notes = await NoteModel.find({ createdBy: req.user._id });
  res.json(notes);
});


noteRoutes.put('/:id', async (req, res) => {
  try {
    const note = await NoteModel.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found or unauthorized' });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: 'Error updating note' });
  }
});

noteRoutes.delete('/:id', async (req, res) => {
  try {
    const note = await NoteModel.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found or unauthorized' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting note' });
  }
});

module.exports = noteRoutes;

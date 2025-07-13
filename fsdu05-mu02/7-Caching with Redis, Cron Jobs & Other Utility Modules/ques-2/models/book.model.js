import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    pages: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);

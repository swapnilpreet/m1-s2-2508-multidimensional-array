const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available',
    required: true
  },
  borrowers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

BooksSchema.pre('save', function(next) {
  if (this.borrowers.length > 0) {
    this.status = 'borrowed';
  } else {
    this.status = 'available';
  }
  next();
});


const BookModel=mongoose.model("LibBook",BooksSchema)

module.exports=BookModel;
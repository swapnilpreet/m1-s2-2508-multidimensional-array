const express = require('express');
const router = express.Router();
const {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook
} = require('../controllers/controller');

const {
  validateBookData,
  checkBorrowLimit
} = require('../middleware/middleware');

// Add a new book
router.post('/books', validateBookData, addBook);

// Borrow a book
router.patch('/borrow/:id', checkBorrowLimit, borrowBook);

// Return a book
router.patch('/return/:id', returnBook);

// Get all books with optional filters
router.get('/books', getBooks);

// Delete a book
router.delete('/books/:id', deleteBook);

module.exports = router;

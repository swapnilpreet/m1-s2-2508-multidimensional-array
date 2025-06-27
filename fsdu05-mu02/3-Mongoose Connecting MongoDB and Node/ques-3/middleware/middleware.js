const Library = require('../models/model');

// Validate required fields
const validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Incomplete Data" });
  }
  next();
};

// Check if borrower already has 3 books
const checkBorrowLimit = async (req, res, next) => {
  const { borrowerName } = req.body;
  const borrowedBooks = await Library.find({
    borrowerName,
    status: "borrowed"
  });
  if (borrowedBooks.length >= 3) {
    return res.status(409).json({ error: "Borrowing limit exceeded (3 books max)" });
  }
  next();
};
module.exports = { validateBookData, checkBorrowLimit };

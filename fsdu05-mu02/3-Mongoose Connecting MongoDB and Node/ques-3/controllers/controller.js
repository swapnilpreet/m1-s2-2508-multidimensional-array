const Library = require('../models/model');

// Add Book
const addBook = async (req, res) => {
  try {
    const book = await Library.create(req.body);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status !== "available") {
      return res.status(409).json({ error: "Book is not available for borrowing" });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    book.status = "borrowed";
    book.borrowerName = req.body.borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;

    await book.save();

    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Return Book
const returnBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status !== "borrowed") {
      return res.status(409).json({ error: "Book is not currently borrowed" });
    }

    const returnDate = new Date();
    let overdueFees = 0;

    if (returnDate > book.dueDate) {
      const lateDays = Math.ceil((returnDate - book.dueDate) / (1000 * 60 * 60 * 24));
      overdueFees = lateDays * 10;
    }

    book.status = "available";
    book.returnDate = returnDate;
    book.overdueFees = overdueFees;
    book.borrowerName = null;
    book.borrowDate = null;
    book.dueDate = null;

    await book.save();

    res.status(200).json({
      message: "Book returned successfully",
      overdueFees,
      book
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Books (with optional filters)
const getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (title) filter.title = new RegExp(title, "i");

    const books = await Library.find(filter);
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Book (only if not borrowed)
const deleteBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status === "borrowed") {
      return res.status(409).json({ error: "Cannot delete a borrowed book" });
    }

    await book.remove();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addBook, borrowBook, returnBook, getBooks, deleteBook };

const BookModel = require("../model/book.model");
const MemberModel = require("../model/member.model");

exports.addBook = async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const member = new MemberModel(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const book = await BookModel.findById(bookId);
    if (!book || book.status === 'borrowed') throw new Error('Book not available');

    const member = await MemberModel.findById(memberId);
    if (!member) throw new Error('Member not found');

    book.borrowers.push(memberId);
    book.status = 'borrowed';
    await book.save();

    member.borrowedBooks.push(bookId);
    await member.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const book = await BookModel.findById(bookId);
    const member = await MemberModel.findById(memberId);

    if (!book || !member) throw new Error('Invalid book or member');

    book.borrowers.pull(memberId);
    book.status = book.borrowers.length === 0 ? 'available' : 'borrowed';
    await book.save();

    member.borrowedBooks.pull(bookId);
    await member.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMemberBorrowedBooks = async (req, res) => {
  try {
    const member = await MemberModel.findById(req.params.memberId).populate('borrowedBooks');
    res.status(200).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookBorrowers = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.bookId).populate('borrowers');
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updated = await BookModel.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await BookModel.findByIdAndDelete(req.params.bookId);
    await MemberModel.updateMany(
      { borrowedBooks: book._id },
      { $pull: { borrowedBooks: book._id } }
    );
    res.status(200).json({ message: 'Book deleted and removed from all members' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

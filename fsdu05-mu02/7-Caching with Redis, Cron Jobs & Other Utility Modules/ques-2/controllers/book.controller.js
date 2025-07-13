import Book from "../models/book.model.js";
import { invalidateBooks } from "../middleware/cache.js";
import redis, { userKey } from "../config/redis.js";

export const getBooks = async (req, res) => {
  const data = await Book.find({ owner: req.user._id });
  res.json(data);
};

export const createBook = async (req, res) => {
  const book = await Book.create({ ...req.body, owner: req.user._id });
  await invalidateBooks(req.user._id);
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true }
  );
  if (!book) return res.status(404).json({ msg: "Not found" });
  await invalidateBooks(req.user._id);
  res.json(book);
};

export const deleteBook = async (req, res) => {
  await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  await invalidateBooks(req.user._id);
  res.status(204).end();
};

export const enqueueBulk = async (req, res) => {
  const books = req.body;
  const listKey = userKey(req.user._id, "bulkBooks");
  await redis.rpush(listKey, JSON.stringify(books));
  res.json({ msg: "Books will be added later." });
};

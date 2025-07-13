import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  enqueueBulk,
} from "../controllers/book.controller.js";
import { protect } from "../middleware/auth.js";
import { cacheBooks } from "../middleware/cache.js";

const router = express.Router();

router.use(protect);

router.route("/books").get(cacheBooks, getBooks).post(createBook);

router.route("/books/:id").put(updateBook).delete(deleteBook);

router.post("/books/bulk", enqueueBulk);

export default router;

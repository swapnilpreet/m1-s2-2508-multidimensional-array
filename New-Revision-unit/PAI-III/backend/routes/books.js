const express = require("express");
const router = express.Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} = require("../controllers/bookControllers");

const protect = require("../middlewares/auth");
const adminOnly = require("../middlewares/role");

router.get("/", getBooks);
router.post("/", protect, adminOnly, addBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

module.exports = router;
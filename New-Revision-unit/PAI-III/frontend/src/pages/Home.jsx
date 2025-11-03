import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/Book";

export default function Home({ token, role }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books?page=${page}&genre=${genre}&author=${author}`
      );
      setBooks(res.data.books);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteBook = async (id) => {
    if (role !== "admin") return alert("Only admin can delete!");
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (err) {
        console.log(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, genre, author]);

  return (
    <div className="container">
      <h2>📚 All Books</h2>

      <div className="filters">
        <input
          placeholder="Filter by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          placeholder="Filter by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={() => fetchBooks()}>Search</button>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book._id} book={book} role={role} deleteBook={deleteBook} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page}/{totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
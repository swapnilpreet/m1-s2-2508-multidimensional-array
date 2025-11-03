import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book, role, deleteBook }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Genre:</b> {book.genre}</p>
      <p><b>Year:</b> {book.publishedYear}</p>
      <p><b>Price:</b> ₹{book.price}</p>

      {role === "admin" && (
        <div className="actions">
          <Link to={`/edit/${book._id}`}>Edit</Link>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
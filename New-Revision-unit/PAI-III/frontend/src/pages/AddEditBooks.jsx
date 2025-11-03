import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditBook({ token }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/books?page=1&limit=1000`).then((res) => {
        const found = res.data.books.find((b) => b._id === id);
        if (found) setBook(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/books/${id}`, book, {
          headers: { Authorization: `Bearer ${token} `},
        });
      } else {
        await axios.post(`http://localhost:5000/api/books`, book, {
          headers: { Authorization:` Bearer ${token}` },
        });
      }
      navigate("/");
    } catch (err) {
        console.log(err);
      alert("Operation failed");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
        <input placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
        <input placeholder="Genre" value={book.genre} onChange={(e) => setBook({ ...book, genre: e.target.value })} />
        <input type="number" placeholder="Year" value={book.publishedYear} onChange={(e) => setBook({ ...book, publishedYear: e.target.value })} />
        <input type="number" placeholder="Price" value={book.price} onChange={(e) => setBook({ ...book, price: e.target.value })} />
        <textarea placeholder="Description" value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })}></textarea>
        <button type="submit">{id ? "Update" : "Add"} Book</button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const BookForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: '', author: '', genre: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre) return;
    dispatch({ type: 'ADD_BOOK', payload: { id: uuidv4(), ...form } });
    setForm({ title: '', author: '', genre: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const BookList = () => {
  const books = useSelector(state => state.books);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', genre: '' });

  const filteredBooks = books.filter(book => {
    const authorMatch = filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true;
    const genreMatch = filters.genre ? book.genre.toLowerCase() === filters.genre.toLowerCase() : true;
    const statusMatch = filters.status === 'all' ? true : filters.status === 'read' ? book.read : !book.read;
    return authorMatch && genreMatch && statusMatch;
  });

  const startEdit = (book) => {
    setEditMode(book.id);
    setEditForm({ title: book.title, author: book.author, genre: book.genre });
  };

  const submitEdit = (id) => {
    dispatch({ type: 'EDIT_BOOK', payload: { id, ...editForm } });
    setEditMode(null);
  };

  return (
    <div className="book-list">
      {filteredBooks.map(book => (
        <div key={book.id} className="book-card">
          {editMode === book.id ? (
            <>
              <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
              <input value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} />
              <input value={editForm.genre} onChange={e => setEditForm({ ...editForm, genre: e.target.value })} />
              <button onClick={() => submitEdit(book.id)}>Save</button>
              <button onClick={() => setEditMode(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{book.title} {book.read && '✓'}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <button onClick={() => dispatch({ type: 'TOGGLE_READ', payload: book.id })}>
                Mark as {book.read ? 'Unread' : 'Read'}
              </button>
              <button onClick={() => startEdit(book)}>Edit</button>
              <button onClick={() => dispatch({ type: 'DELETE_BOOK', payload: book.id })}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
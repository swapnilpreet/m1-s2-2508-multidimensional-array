import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRead, deleteBook } from '../redux/booksSlice';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const filteredBooks = books.filter((book) => {
    const authorMatch = filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true;
    const genreMatch = filters.genre ? book.genre.toLowerCase() === filters.genre.toLowerCase() : true;
    const statusMatch =
      filters.status === 'all' ? true : filters.status === 'read' ? book.read : !book.read;
    return authorMatch && genreMatch && statusMatch;
  });

  return (
    <div className="book-list">
      {filteredBooks.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title} {book.read && '✓'}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <button onClick={() => dispatch(toggleRead(book.id))}>
            Mark as {book.read ? 'Unread' : 'Read'}
          </button>
          <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const BookFilter = () => {
  const { author, genre, status } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  return (
    <div className="filter-panel">
      <input
        placeholder="Filter by Author"
        value={author}
        onChange={(e) => dispatch({ type: 'SET_AUTHOR_FILTER', payload: e.target.value })}
      />
      <input
        placeholder="Filter by Genre"
        value={genre}
        onChange={(e) => dispatch({ type: 'SET_GENRE_FILTER', payload: e.target.value })}
      />
      <select value={status} onChange={(e) => dispatch({ type: 'SET_STATUS_FILTER', payload: e.target.value })}>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
      <button onClick={() => dispatch({ type: 'RESET_FILTERS' })}>Reset</button>
    </div>
  );
};

export default BookFilter;
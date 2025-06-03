import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthorFilter, setGenreFilter, setStatusFilter, resetFilters } from '../redux/filterSlice';

const BookFilter = () => {
  const dispatch = useDispatch();
  const { author, genre, status } = useSelector((state) => state.filters);

  return (
    <div className="filter-panel">
      <input
        placeholder="Filter by Author"
        value={author}
        onChange={(e) => dispatch(setAuthorFilter(e.target.value))}
      />
      <input
        placeholder="Filter by Genre"
        value={genre}
        onChange={(e) => dispatch(setGenreFilter(e.target.value))}
      />
      <select value={status} onChange={(e) => dispatch(setStatusFilter(e.target.value))}>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
      <button onClick={() => dispatch(resetFilters())}>Reset</button>
    </div>
  );
};

export default BookFilter;
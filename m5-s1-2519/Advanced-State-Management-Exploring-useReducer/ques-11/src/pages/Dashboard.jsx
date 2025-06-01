// File: src/pages/Dashboard.js
import React, { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import debounce from 'lodash.debounce';

const initialState = {
  search: '',
  countries: [],
  loading: false,
  error: '',
  page: 1,
  usePagination: true
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH': return { ...state, search: action.payload, page: 1 };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload };
    case 'SET_COUNTRIES': return { ...state, countries: action.payload };
    case 'SET_PAGE': return { ...state, page: action.payload };
    case 'TOGGLE_MODE': return { ...state, usePagination: !state.usePagination, page: 1 };
    default: throw new Error('Invalid action');
  }
}

export default function Dashboard() {
  const { user, dispatch: authDispatch } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCountries = async (search = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await axios.get('https://api.first.org/data/v1/countries');
      const data = Object.values(res.data.data).filter(c =>
        c.country.toLowerCase().includes(search.toLowerCase())
      );
      dispatch({ type: 'SET_COUNTRIES', payload: data });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch countries' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const debouncedSearch = debounce((text) => {
    fetchCountries(text);
  }, 500);

  useEffect(() => {
    debouncedSearch(state.search);
  }, [state.search]);

  const countriesPerPage = 10;
  const displayedCountries = state.usePagination
    ? state.countries.slice((state.page - 1) * countriesPerPage, state.page * countriesPerPage)
    : state.countries.slice(0, state.page * countriesPerPage);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={() => authDispatch({ type: 'LOGOUT' })}>Logout</button>
      <input
        placeholder="Search countries"
        value={state.search}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'TOGGLE_MODE' })}>
        Switch to {state.usePagination ? 'Infinite Scroll' : 'Pagination'}
      </button>

      {state.loading && <p>Loading...</p>}
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

      <ul>
        {displayedCountries.map((c, i) => (
          <li key={i}>{c.country}</li>
        ))}
      </ul>

      {state.usePagination && (
        <div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page - 1 })}
            disabled={state.page === 1}
          >
            Prev
          </button>
          <span> Page {state.page} </span>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page + 1 })}
            disabled={(state.page * countriesPerPage) >= state.countries.length}
          >
            Next
          </button>
        </div>
      )}

      {!state.usePagination && (
        <button onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page + 1 })}>
          Load More
        </button>
      )}
    </div>
  );
}
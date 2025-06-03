import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('https://jsonmock.hackerrank.com/api/football_matches?page=2');
      dispatch(setMatches(response.data.data));
    } catch (error) {
        console.log(error)
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    isLoading: false,
    isError: false,
    footballMatches: [],
    favorites: [],
    searchQuery: '',
    filters: {
      team: '',
      outcome: '',
      date: ''
    }
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setMatches: (state, action) => {
      state.footballMatches = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFavorite: (state, action) => {
      const matchId = action.payload;
      if (state.favorites.includes(matchId)) {
        state.favorites = state.favorites.filter(id => id !== matchId);
      } else {
        state.favorites.push(matchId);
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setMatches,
  setSearchQuery,
  setFilters,
  toggleFavorite
} = matchesSlice.actions;

export default matchesSlice.reducer;
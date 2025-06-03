import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches, setSearchQuery, setFilters, toggleFavorite } from './redux/matchesSlice';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, footballMatches, favorites, searchQuery, filters } = useSelector(
    state => state.matches
  );

  useEffect(()=>{
    dispatch(fetchMatches());
  }, [dispatch]);

  const filteredMatches = footballMatches.filter(match => {
    const matchText = `${match.team1} ${match.team2} ${match.venue} ${match.date}`.toLowerCase();
    const searchMatch = matchText.includes(searchQuery.toLowerCase());
    const teamFilter =
      filters.team === '' ||
      match.team1.toLowerCase().includes(filters.team.toLowerCase()) ||
      match.team2.toLowerCase().includes(filters.team.toLowerCase());
    const dateFilter =
      filters.date === '' || match.date === filters.date;
    const outcomeFilter = filters.outcome === '' || filters.outcome === match.winner;

    return searchMatch && teamFilter && dateFilter && outcomeFilter;
  });

  const handleFavorite = matchId => {
    dispatch(toggleFavorite(matchId));
  };

  return (
    <div>
      <h1>Football Match Tracker</h1>

      <div>
        <input
          type="text"
          placeholder="Search matches..."
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
        />

        <input
          type="text"
          placeholder="Filter by team"
          onChange={e => dispatch(setFilters({ team: e.target.value }))}
        />

        <input
          type="date"
          onChange={e => dispatch(setFilters({ date: e.target.value }))}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data.</p>}

      <div>
        {filteredMatches.map((match, index) => (
          <div key={index}>
            <div>
              <span>{match.team1} vs {match.team2}</span>
              <span>Venue: {match.venue}</span>
              <span>Date: {match.date}</span>
              <span>Winner: {match.winner}</span>
            </div>
            <button
              onClick={() => handleFavorite(index)}
            >
              {favorites.includes(index) ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Favorite Matches</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <ul>
            {favorites.map(favIdx => (
              <li key={favIdx}>
                {footballMatches[favIdx].team1} vs {footballMatches[favIdx].team2} on {footballMatches[favIdx].date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
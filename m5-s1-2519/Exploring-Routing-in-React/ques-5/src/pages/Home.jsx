import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const searchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=d09f6c8c&s=${query}`);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'Movie not found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={query}
        placeholder="Enter movie title"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ margin: '1rem 0' }}>
            <Link to={`/movie/${movie.imdbID}`}>
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={movie.Title} height="150" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

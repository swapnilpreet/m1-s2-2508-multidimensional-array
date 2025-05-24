import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=d09f6c8c&i=${id}&plot=full`);
        const data = await res.json();

        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ padding: '1rem' }}>Loading...</p>;
  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{movie.Title} ({movie.Year})</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ height: '300px' }} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
};

export default MovieDetails;

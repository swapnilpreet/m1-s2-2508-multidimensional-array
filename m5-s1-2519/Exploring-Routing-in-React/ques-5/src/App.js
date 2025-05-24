import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

const App = () => (
  <div>
    <nav style={{ padding: '1rem', background: '#ddd' }}>
      <Link to="/">Home</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </div>
);

export default App;

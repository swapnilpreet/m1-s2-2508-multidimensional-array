import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WeatherDetails from './pages/WeatherDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather/:city" element={<WeatherDetails />} />
    </Routes>
  );
};

export default App;

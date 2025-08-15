import { useState } from 'react'
import './App.css'
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import SearchWeather from './components/SearchWeather';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forecast from './components/Forecast';
// 6fde073f69659314f6ac4c5cf7103596 
function App() {
  const [city, setCity] = useState("");


  return (
    <>
      <BrowserRouter>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🌦 Weather Forecast App</h1>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <SearchWeather setCity={setCity} />
            </PrivateRoute>
            }/>
          <Route path="/login" element={
          <Login/>
          }/>
          <Route
            path="/forecast"
            element={
              <PrivateRoute>
                <Forecast city={city} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App

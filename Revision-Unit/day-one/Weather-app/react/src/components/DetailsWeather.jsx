import React from 'react'

const DetailsWeather = ({ weather }) => {
  return (
    <div className="mt-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{weather.name}</h2>
      <p>🌡 Temp: {weather.main.temp} °C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌥 Condition: {weather.weather[0].description}</p>
    </div>
  );
}

export default DetailsWeather
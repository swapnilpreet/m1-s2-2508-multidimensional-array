import React, { useEffect, useState } from 'react'
import { getForecast } from '../api';

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (city) {
      getForecast(city).then(setForecast);
    }
  }, [city]);

  if (!forecast) return null;

  return (
    <div className="mt-4 p-4 border rounded shadow">
      <h2 className="text-lg font-bold">5-Day Forecast for {forecast.city.name}</h2>
      <ul>
        {forecast.list.slice(0, 5).map((item, i) => (
          <li key={i}>
            {item.dt_txt} → {item.main.temp} °C, {item.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forecast
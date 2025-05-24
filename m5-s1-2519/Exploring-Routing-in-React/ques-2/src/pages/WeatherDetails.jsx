import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const WeatherDetails = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=12ea4dcc17b96eac557bc806d9a2cca1`
    )
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message));
  }, [city]);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading...</p>;

  const { main, weather: weatherInfo, coord } = weather;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Weather in {city}</h2>
      <p>
        <strong>Temperature:</strong> {main.temp} °C
      </p>
      <p>
        <strong>Humidity:</strong> {main.humidity} %
      </p>
      <p>
        <strong>Condition:</strong> {weatherInfo[0].description}
      </p>

    </div>
  );
};

export default WeatherDetails;

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weather');
const YOUR_API_KEY="02c013497c4dd9062147371d993b7f50"
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value;
  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  weatherDisplay.textContent = `Temperature in ${city}: ${data.main.temp}°C`;
}


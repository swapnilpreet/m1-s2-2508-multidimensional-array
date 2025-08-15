export const OPENWEATHER_KEY = "6fde073f69659314f6ac4c5cf7103596";
const API_KEY = "reqres-free-v1";
export async function getWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`
  );
  return res.json();
}

export async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`
  );
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
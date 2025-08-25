import axios from "axios";

const KEY = import.meta.env.VITE_NEWSAPI_KEY;
console.log(KEY)
const BASE = "https://newsapi.org/v2";

const api = axios.create({
  baseURL: BASE,
  headers: {
    "X-Api-Key": KEY,
  },
  timeout: 15000,
});

export default api;

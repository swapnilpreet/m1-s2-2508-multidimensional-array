import axios from 'axios';
const instance = axios.create({ baseURL: 'https://YOUR_DB_URL/' });
export default instance;
import axios from 'axios';

export default axios.create({
  // baseURL: 'https://api.ellabib.se',
  // baseURL: 'http://169.254.114.44:3000',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.100:3000/api', // Replace with your actual backend URL
});

export default api;
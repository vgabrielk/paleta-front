import type { AxiosInstance } from 'axios';
import axios from 'axios';

const token = localStorage.getItem('token');
console.log(token);
const loginApi: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000/api',
});

loginApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.log(error);
    return error;
  },
);

loginApi.interceptors.request.use(
  (config) => {
    if (config.url !== '/login' && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return error;
  },
);

export default loginApi;

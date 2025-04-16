import type { AxiosInstance } from 'axios';
import axios from 'axios';

const token = localStorage.getItem('token');
const baseUrl = `${import.meta.env.VITE_API_URL}/api`;
const api: AxiosInstance = axios.create({
  baseURL: baseUrl || 'http://localhost:8000/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.log(error);
    return error;
  },
);

api.interceptors.request.use(
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

export default api;

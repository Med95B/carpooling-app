import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Ajouter un interceptor pour inclure le token dans les headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour ajuster le Content-Type
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Pour les requetes avec des fichiers
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    // Pour les requetes avec des objets JSON
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default axiosInstance;

// src/services/api.ts
import axios from 'axios';

// ¡CAMBIA ESTA LÍNEA! Ahora apunta a la ruta de tu proxy local de Vite
const API_BASE_URL = '/api/ahorrista';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token'); // El token se guarda como 'jwt_token'
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`; // Formato de autorización JWT
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas 401 (No autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_email'); // También limpia el email si lo guardas
      // Redirige al login. En un entorno Next.js "use client" esto funcionará.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
// src/services/auth.ts
import api from './api';
import type { AuthResponse } from '../index';
import type { User } from '../index';

export const registerUser = async (email: string, passwd: string): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/authentication/register', { email, passwd });
    if (response.data.status === 200) { // La API de Ahorrista devuelve 200 para registro exitoso
      localStorage.setItem('jwt_token', response.data.result.token); // Guarda el token JWT
      localStorage.setItem('user_email', response.data.result.username); // Guarda el email también
      return { email: response.data.result.username, token: response.data.result.token };
    }
    throw new Error(response.data.message || 'Registration failed');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error during registration');
  }
};

export const loginUser = async (email: string, passwd: string): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/authentication/login', { email, passwd });
    if (response.data.status === 200) { // La API de Ahorrista devuelve 200 para login exitoso
      localStorage.setItem('jwt_token', response.data.result.token); // Guarda el token JWT
      localStorage.setItem('user_email', response.data.result.username); // Guarda el email también
      return { email: response.data.result.username, token: response.data.result.token };
    }
    throw new Error(response.data.message || 'Login failed');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error during login');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user_email');
};
// src/pages/LoginPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Usar useNavigate y Link de react-router-dom

import { loginUser } from '../services/auth'; // Importa la función de login de Ahorrista
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import AuthForm from '../components/auth/AuthForm'; // Reutilizamos el componente AuthForm

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Usa useNavigate para la navegación
  const { login: authContextLogin, isAuthenticated } = useAuth(); // Obtén la función login y el estado de autenticación del contexto

  // Si ya está autenticado, redirige al dashboard inmediatamente
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password); // Usa la API de login de Ahorrista
      authContextLogin(userData); // Actualiza el contexto de autenticación
      navigate('/dashboard'); // Redirige al dashboard después del login exitoso
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-12">
      <AuthForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
      <p className="mt-4 text-gray-700">
        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
      </p>
    </div>
  );
}
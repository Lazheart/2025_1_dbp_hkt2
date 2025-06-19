// src/pages/RegisterPage.tsx
"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Usar Link de react-router-dom
import { registerUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth();

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await registerUser(email, password);
      authContextLogin(userData); // Inicia sesión automáticamente después del registro
      navigate('/dashboard'); // Redirige al dashboard
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-12">
      <AuthForm
        isRegister
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />
      <p className="mt-4 text-gray-700">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
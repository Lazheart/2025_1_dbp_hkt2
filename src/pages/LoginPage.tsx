// src/pages/LoginPage.tsx
"use client";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authContextLogin, isAuthenticated } = useAuth();

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
      const userData = await loginUser(email, password);
      authContextLogin(userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <AuthForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer opcional */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Protected by industry-standard security measures
        </p>
      </div>
    </div>
  );
}
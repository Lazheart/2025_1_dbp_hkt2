// src/components/auth/AuthForm.tsx
import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

interface AuthFormProps {
  isRegister?: boolean;
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegister = false, onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-8 border border-gray-200 rounded-xl shadow-lg bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{isRegister ? 'Register' : 'Login'}</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={isRegister ? 12 : 0} // Contraseña de 12 caracteres para registro
      />
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
      </Button>
    </form>
  );
};

export default AuthForm;
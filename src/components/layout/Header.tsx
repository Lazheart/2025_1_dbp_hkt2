// src/components/layout/Header.tsx
"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/auth';

const Header: React.FC = () => {
  const { isAuthenticated, logout: authContextLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    authContextLogout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-white no-underline text-2xl font-bold">
        Ahorrista
      </Link>
      <nav>
        {isAuthenticated ? (
          <ul className="list-none m-0 p-0 flex gap-5">
            <li>
              <Link to="/dashboard" className="text-white no-underline text-lg hover:text-blue-300">Dashboard</Link>
            </li>
            <li>
              <Link to="/goals" className="text-white no-underline text-lg hover:text-blue-300">Goals</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="bg-transparent border-none text-white text-lg cursor-pointer hover:text-blue-300">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="list-none m-0 p-0 flex gap-5">
            <li>
              <Link to="/login" className="text-white no-underline text-lg hover:text-blue-300">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white no-underline text-lg hover:text-blue-300">Register</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
// src/page.tsx
"use client"; // Mantener esto para compatibilidad con Next.js App Router.

import { Routes, Route, Link } from 'react-router-dom'; // Importa Routes y Route
import ProtectedRoute from './components/auth/ProtectedRoute'; // Tu componente de ruta protegida

// Importa todas las páginas de Ahorrista
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExpenseDetailPage from './pages/ExpenseDetailPage';
import ExpenseFormPage from './pages/ExpenseFormPage';
import GoalsPage from './pages/GoalsPage';

// El componente principal que se renderizará dentro del RootLayout
export default function HomePage() {
  return (
    <Routes>
      {/* Rutas públicas: Login y Registro */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas Protegidas: requieren autenticación */}
      <Route path="/" element={<ProtectedRoute />}>
        {/* La ruta raíz del layout protegido, redirige al dashboard */}
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="expenses/new" element={<ExpenseFormPage />} />
        <Route path="expenses/detail" element={<ExpenseDetailPage />} />
        <Route path="goals" element={<GoalsPage />} />
      </Route>

      {/* Ruta para 404 No Encontrado */}
      <Route
        path="*"
        element={
          <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="mt-4 text-lg text-gray-700">The page you are looking for does not exist.</p>
            <Link to="/login" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-colors">
              Go to Login
            </Link>
          </div>
        }
      />
    </Routes>
  );
}
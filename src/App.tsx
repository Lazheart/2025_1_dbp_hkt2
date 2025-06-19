// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExpenseDetailPage from './pages/ExpenseDetailPage';
import ExpenseFormPage from './pages/ExpenseFormPage'; // Nueva página para añadir gasto
import GoalsPage from './pages/GoalsPage';
import Header from './components/layout/Header'; // Incluir el Header para todas las páginas

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* El Header se renderizará en todas las rutas */}
        {/* Considera si quieres que el Header sea dinámico (login/logout) o solo en rutas protegidas */}
        {/* Para simplicidad de un hackathon, lo ponemos fuera de Routes para que siempre esté visible */}
        <Header />  {/* Ahora el Header se renderiza en todas las páginas */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} /> {/* Ruta por defecto después de login */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="expenses/detail" element={<ExpenseDetailPage />} />
            <Route path="expenses/new" element={<ExpenseFormPage />} /> {/* Ruta para añadir un nuevo gasto */}
            <Route path="goals" element={<GoalsPage />} />
          </Route>
          {/* Puedes añadir una ruta para un 404 Not Found */}
          <Route path="*" element={<div><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p><Link to="/login">Go to Login</Link></div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
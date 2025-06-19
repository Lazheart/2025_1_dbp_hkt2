// src/layout.tsx
"use client"; // Necesario para componentes de cliente en Next.js App Router

import React from 'react';
import "./globals.css"; // Ruta a tu archivo global CSS con Tailwind
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import { BrowserRouter as Router } from 'react-router-dom'; // Necesitas Router para envolver toda la app
import Header from './components/layout/Header'; // Tu componente de encabezado de Ahorrista

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        {/* Usamos BrowserRouter aquí para que el enrutamiento funcione en el lado del cliente */}
        <Router>
          <AuthProvider>
            {/* El Header contendrá la lógica de navegación y logout */}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
          </AuthProvider>
        </Router>
      </body>
    </html>
  );
}
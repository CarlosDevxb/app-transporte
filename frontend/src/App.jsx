import React, { useState, useEffect } from 'react';
import './App.css'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // Comprueba si hay un token para decidir qué página mostrar
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  return (
    /* Renderizado condicional sin un div contenedor.
       Esto evita que estilos de App.css afecten el layout de las páginas. */
    isAuthenticated ? <DashboardPage /> : <LoginPage />
  );
}
export default App;

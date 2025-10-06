import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Comprobar si la URL tiene el parámetro de sesión expirada
    const params = new URLSearchParams(window.location.search);
    if (params.get('sessionExpired')) {
      setSessionExpired(true);
    }
  }, []);

  // Esta función se pasará al LoginForm y se ejecutará al enviar el formulario
  const handleLogin = async (credentials) => {
        setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si la respuesta no es 2xx, lanzamos un error con el mensaje del backend
        throw new Error(data.message || 'Ocurrió un error.');
      }

      // Si la respuesta es exitosa, guardamos el token
      localStorage.setItem('authToken', data.token);

      // Recargamos la página. App.jsx detectará el token y mostrará el Dashboard.
      window.location.reload();
    } catch (apiError) {
      // Si la API devuelve un error (ej. credenciales incorrectas)
      // Usamos el mensaje del error que lanzamos en el 'try'
      setError(apiError.message);
      console.error('Error de inicio de sesión:', apiError);
    } finally {
      // Esto se ejecuta siempre, ya sea éxito o error

      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Aquí podrías tener un header o cualquier otro elemento de la página */}
      {sessionExpired && (
        <div className="session-expired-message">
          Tu sesión ha expirado por inactividad. Por favor, inicia sesión de nuevo.
        </div>
      )}
      <LoginForm 
        onSubmit={handleLogin} 
        error={error} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default LoginPage;
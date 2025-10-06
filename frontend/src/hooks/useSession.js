import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const WARNING_TIME = 2 * 60 * 1000; // 2 minutos para advertir
const COUNTDOWN_SECONDS = 60; // 1 minuto de cuenta regresiva en el modal

export const useSession = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const handleLogout = useCallback((expired = false) => {
    localStorage.removeItem('authToken');
    const redirectUrl = expired ? '/?sessionExpired=true' : '/';
    window.location.href = redirectUrl;
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo refrescar la sesión.');
      }

      const { token: newToken } = await response.json();
      localStorage.setItem('authToken', newToken);
      console.log('Sesión extendida.');
      return true;
    } catch (error) {
      console.error(error.message);
      handleLogout(true);
      return false;
    }
  }, [handleLogout]);

  const handleContinueSession = useCallback(async () => {
    setIsModalOpen(false);
    await refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    let sessionTimeout;
    let warningTimeout;
    let countdownInterval;

    const checkSession = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        handleLogout();
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000;
        const now = Date.now();
        const timeUntilExpiration = expirationTime - now;

        // Limpiar timers anteriores
        clearTimeout(sessionTimeout);
        clearTimeout(warningTimeout);
        clearInterval(countdownInterval);

        if (timeUntilExpiration <= 0) {
          handleLogout(true);
        } else {
          // Timer para mostrar el modal de advertencia
          const warningTimer = timeUntilExpiration - WARNING_TIME;
          if (warningTimer > 0) {
            warningTimeout = setTimeout(() => {
              setIsModalOpen(true);
              setCountdown(COUNTDOWN_SECONDS);
            }, warningTimer);
          }

          // Timer para cerrar la sesión si no hay interacción
          sessionTimeout = setTimeout(() => handleLogout(true), timeUntilExpiration);
        }
      } catch (e) {
        console.error('Token inválido:', e);
        handleLogout();
      }
    };

    // Revisa la sesión al montar y cada vez que se refresca el token
    checkSession();
    // También revisa al cambiar la visibilidad de la pestaña
    document.addEventListener('visibilitychange', checkSession);

    return () => {
      clearTimeout(sessionTimeout);
      clearTimeout(warningTimeout);
      clearInterval(countdownInterval);
      document.removeEventListener('visibilitychange', checkSession);
    };
  }, [handleLogout, refreshToken]);

  useEffect(() => {
    if (isModalOpen && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isModalOpen && countdown === 0) {
      handleLogout(true);
    }
  }, [isModalOpen, countdown, handleLogout]);

  return { isModalOpen, countdown, handleContinueSession, handleLogout };
};
import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import logo from '/assets/cuchigologo.png'; // Reutilizamos el logo
import entertainmentLogo from '/assets/CuchipuEntreteinment(DS)V1.jpg'; // Logo de la empresa
import { useSession } from '../hooks/useSession';
import SessionTimeoutModal from '../components/SessionTimeoutModal';
 
const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({ name: 'Usuario', balance: '0.00', card_type: 'General' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isModalOpen, countdown, handleContinueSession, handleLogout } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          // Si no hay token, no hay nada que hacer aquí, simplemente cerramos sesión.
          handleLogout();
          return;
        }

        const response = await fetch('http://localhost:3000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Si el status es 401, significa que el token es inválido o expiró.
          if (response.status === 401) {
            console.error("Token inválido o expirado. Cerrando sesión.");
            handleLogout();
            return; // Detenemos la ejecución para evitar actualizar el estado.
          }
          // Para otros errores (ej. 500), lanzamos un error para mostrar un mensaje.
          const errorData = await response.json();
          throw new Error(errorData.message || 'No se pudo obtener la información del usuario.');
        }

        const data = await response.json();
        setUserData({
          name: data.name || 'Usuario',
          balance: data.balance !== null ? parseFloat(data.balance).toFixed(2) : 'N/A',
          card_type: data.card_type || 'General'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [handleLogout]); // handleLogout es estable gracias a useCallback en el hook

  return (
    <div className="dashboard-container">
      <SessionTimeoutModal isOpen={isModalOpen} onContinue={handleContinueSession} onLogout={() => handleLogout(true)} countdown={countdown} />
      {/* Overlay para cerrar el menú en móvil */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      <div className="dashboard-layout">
        {/* Añadimos la clase 'open' condicionalmente */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <img src={logo} alt="CuchipuGo Logo" className="sidebar-logo" />
            <h2>CuchipuGo</h2>
          </div>
          <nav className="sidebar-nav">
            {/* Para íconos reales, considera usar una librería como react-icons */}
            <a href="#" className="nav-item active">
              <span className="nav-icon">🏠</span>
              Inicio
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🗺️</span>
              Rutas
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💳</span>
              Mi Tarjeta
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">⚙️</span>
              Configuración
            </a>
          </nav>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-button">
              <span className="nav-icon">🚪</span>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className="main-content">
          <header className="main-header">
            {/* Botón de menú hamburguesa para móvil */}
            <button className="mobile-menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>

            <h1>¡Hola, {userData.name}!</h1>
 
          </header>

          <section className="dashboard-cards">
            <div className="card">
              <h3>Saldo Actual</h3>
              {loading ? (
                <p>Cargando...</p>
              ) : (
                <p className="card-amount">${userData.balance}</p>
              )}
              <a href="#">Recargar Saldo</a>
            </div>
            <div className="card">
              <h3>Rutas Disponibles</h3>
              <p className="card-amount">12</p>
              <a href="#">Ver Rutas</a>
            </div>
          <div className="card">
            <h3>Tipo de Tarjeta</h3>
            <p className="card-amount card-type">{userData.card_type}</p>
            <a href="#">Ver Beneficios</a>
          </div>
          </section>
        </main>
      </div>

      <footer className="app-footer">
        <img src={entertainmentLogo} alt="Cuchipu Entertainment Logo" className="footer-logo" />
        <div className="footer-info">
          <p>© 2024 Cuchipu Entertainment. Todos los derechos reservados.</p>
          <p>Soporte: <a href="mailto:soporte@cuchipu.com">soporte@cuchipu.com</a></p>
        </div>
        <div className="footer-social">
          <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
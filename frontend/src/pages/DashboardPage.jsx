import React, { useState } from 'react';
import './DashboardPage.css';
import logo from '/assets/cuchigologo.png'; // Reutilizamos el logo
import entertainmentLogo from '/assets/CuchipuEntreteinment(DS)V1.jpg'; // Logo de la empresa
 
const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Esta función se encargará de cerrar la sesión
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload(); // Una forma simple de "redirigir" al login
  };

  // Datos de ejemplo. En una app real, vendrían del token o de una API.
  const userName = "Carlos";
  const balance = "15.50";

  return (
    <div className="dashboard-container">
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

            <h1>¡Hola, {userName}!</h1>
 
          </header>

          <section className="dashboard-cards">
            <div className="card">
              <h3>Saldo Actual</h3>
              <p className="card-amount">${balance}</p>
              <a href="#">Recargar Saldo</a>
            </div>
            <div className="card">
              <h3>Rutas Disponibles</h3>
              <p className="card-amount">12</p>
              <a href="#">Ver Rutas</a>
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
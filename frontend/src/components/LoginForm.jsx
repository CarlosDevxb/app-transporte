import React, { useState } from 'react';
import './LoginForm.css'; // Importamos los estilos
import logo from '/assets/cuchigologo.png'; // Importamos el logo

// Recibe props del padre (LoginPage) para manejar el envío y los errores
const LoginForm = ({ onSubmit, error, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    onSubmit({ email, password }); // Llama a la función del padre con los datos
  };

  return (
    <div className="login-page-container">
      <div className="login-wrapper">
        <div className="login-branding">
          <div className="branding-content">
            <h1>Bienvenido a CuchipuGo</h1>
            <p>Tu guía definitiva para el transporte público.</p>
          </div>
        </div>
        <div className="login-form-area">
          <img src={logo} alt="Logo CuchipuGo" className="login-logo" />
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <p>Accede a tu cuenta para continuar</p>
            
            {error && <div className="error-message">{error}</div>}

            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="email">Correo Electrónico</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
import React from 'react';
import './SessionTimeoutModal.css';

const SessionTimeoutModal = ({ isOpen, onContinue, onLogout, countdown }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Tu sesión está a punto de expirar</h2>
        <p>
          Por inactividad, tu sesión se cerrará automáticamente en{' '}
          <span className="countdown">{countdown}</span> segundos.
        </p>
        <p>¿Deseas continuar en la sesión?</p>
        <div className="modal-actions">
          <button onClick={onLogout} className="btn btn-logout">
            Cerrar Sesión
          </button>
          <button onClick={onContinue} className="btn btn-continue">
            Continuar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
import React from 'react';
import { Link } from 'react-router-dom';
import './cta.css';

const CTA = () => (
  <div className="containerCTA">
    <div className="gpt3__cta">
      <div className="gpt3__cta-content">
        <p>Registrate hoy y convierte tus tokens a pesos colombianos</p>
        <h3>Regístrese hoy y comience a explorar las infinitas posibilidades.</h3>
      </div>
      <div className="gpt3__cta-btn">
        <Link to="/register">
          <button type="button">
            Registrarme Ahora!
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default CTA;

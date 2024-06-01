import React from 'react';
import possibilityImage from '../../../../assets/possibility.png';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h4>¿Como comienzo a probar la plataforma?</h4>
      <h1 className="gradient__text">Sigue el rastro de tus<br />fondos desde tu panel</h1>
      <p>Accede a un registro detallado de todas tus transacciones y retiros en nuestra plataforma. Nuestro sistema de historial de retiros te permite revisar cada movimiento, asegurando transparencia y control total sobre tus fondos. Mantén un seguimiento claro y organizado de tus ingresos para una mejor gestión financiera.</p>
      <h4>¡Registrate Ahora en Tokenautas!</h4>
    </div>
  </div>
);

export default Possibility;

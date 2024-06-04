import React from 'react';
import Feature from '../Features/Features';
import './WhatTokenautas.css';
import { Link } from 'react-router-dom';


const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="Que es tokenautas?" text="Las modelos webcam son vulnerables al robo de tokens, por eso tokenautas al ser una plataforma respaldada por SpaceModels (Nombrar otros aliados) te brinda seguridad al permitirte disfrutar de su soporte 24/7 con respuesta inmediata, sede fisica y muchos beneficios que solo nosotros podemos darte"  />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">Las posibilidades están más allá de tu imaginación.</h1>
      <Link to="/login">
      <p style={{fontWeight: "bold"}}>¡Explora el sin fin de beneficios para ti!</p>
      </Link>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Billetera de Criptomonedas" text="Las modelos pueden usar sus billeteras para recibir regalos en criptomonedas de sus mejores tippers, asegurando que los fondos lleguen directamente y de manera segura a sus cuentas." />
      <Feature title="Retiros Instantaneos" text="Las modelos pueden retirar sus tokens de manera instantánea y segura, disfrutando de la libertad financiera y la rapidez en el acceso a sus ganancias." />
      <Feature title="Plataforma Intuitiva" text="Nuestra plataforma es fácil de usar, permitiendo a las modelos manejar sus ingresos y actividades de manera eficiente y sin complicaciones técnicas." />
    </div>
  </div>
);

export default WhatGPT3;

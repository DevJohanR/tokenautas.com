import React from 'react';
import gpt3Logo from '/logos/coheteLogoBlanco.png';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Mejora tu futuro con Tokenautas</h1>
    </div>

    <div className="gpt3__footer-btn">
      <button>¡Registrate Ahora!</button>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>Colombia Norte de Santander, <br /> Todos los derechos reservados</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Cuenta</p>
        <p>Webcams</p>
        <p>Aliados</p>
        <p>Blog</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Compañia</h4>
        <p>Terminos y Condiciones</p>
        <p>Politicas de Privacidad</p>
        <p>Social Media</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Contacto</h4>
        <p>Colombia Norte de Santander</p>
        <p>+573020000100</p>
        <p>info@tokenautas.com</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 Tokenautas. Todos los derechos reservados</p>
    </div>
  </div>
);

export default Footer;

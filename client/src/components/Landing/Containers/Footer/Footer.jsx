import React from 'react';
import gpt3Logo from '/logos/coheteLogoBlanco.png';
import './footer.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Footer = () => {
  const handleSectionClick = () => {
    Swal.fire({
      title: 'Sección en desarrollo',
      text: 'Esta sección está en desarrollo. ¡Vuelve pronto para más contenido!',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  };

  return (
    <div className="gpt3__footer section__padding">
      <div className="gpt3__footer-heading">
        <h1 className="gradient__text">Mejora tu futuro con Tokenautas</h1>
      </div>

      <div className="gpt3__footer-btn">
        <Link to="/register">
          <button>¡Registrate Ahora!</button>
        </Link>
      </div>

      <div className="gpt3__footer-links">
        <div className="gpt3__footer-links_logo">
          <img src={gpt3Logo} alt="gpt3_logo" />
          <p>Colombia Norte de Santander, <br /> Todos los derechos reservados</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Links</h4>
          <p onClick={handleSectionClick}>Cuenta</p>
          <p onClick={handleSectionClick}>Webcams</p>
          <p onClick={handleSectionClick}>Aliados</p>
          <p onClick={handleSectionClick}>Blog</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Compañia</h4>
          <p onClick={handleSectionClick}>Terminos y Condiciones</p>
          <p onClick={handleSectionClick}>Politicas de Privacidad</p>
          <p onClick={handleSectionClick}>Social Media</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Contacto</h4>
          <p onClick={handleSectionClick}>Colombia Norte de Santander</p>
          <p onClick={handleSectionClick}>+573020000100</p>
          <p onClick={handleSectionClick}>info@tokenautas.com</p>
        </div>
      </div>

      <div className="gpt3__footer-copyright">
        <p>@2024 Tokenautas. Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Footer;

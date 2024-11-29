import React from 'react';
import gpt3Logo from '/logos/coheteLogoBlanco.png';
import './footer.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Footer = () => {
  const handleSectionClick = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <div className="gpt3__footer section__padding">
      <div className="gpt3__footer-heading">
        <h1 className="gradient__text">Forma parte de la comunidad Tokenautas</h1>
      </div>

      <div className="gpt3__footer-btn">
        <Link to="/register">
          <button>Únete Ahora</button>
        </Link>
      </div>

      <div className="gpt3__footer-links">
        <div className="gpt3__footer-links_logo">
          <img src={gpt3Logo} alt="gpt3_logo" />
          <p>Colombia Norte de Santander, <br /> Todos los derechos reservados</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Comunidad Tokenautas</h4>
          <p onClick={() => handleSectionClick('Red de Modelos', 'Conéctate con modelos de todo el mundo para compartir experiencias.')}>
            Red de Modelos
          </p>
          <p onClick={() => handleSectionClick('Soporte Técnico', 'Accede a ayuda técnica y mejora tu experiencia en la plataforma.')}>
            Soporte Técnico
          </p>
          <p onClick={() => handleSectionClick('Recursos Exclusivos', 'Aprovecha recursos para maximizar tus ingresos y visibilidad.')}>
            Recursos Exclusivos
          </p>
          <p onClick={() => handleSectionClick('Eventos y Conferencias', 'Participa en eventos y capacitaciones organizados por expertos.')}>
            Eventos y Conferencias
          </p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Servicios Especializados</h4>
          <p onClick={() => handleSectionClick('Consultoría Profesional', 'Mejora tu perfil con asesoría profesional personalizada.')}>
            Consultoría Profesional
          </p>
          <p onClick={() => handleSectionClick('Producción de Contenido', 'Obtén herramientas y apoyo para crear contenido de calidad.')}>
            Producción de Contenido
          </p>
          <p onClick={() => handleSectionClick('Promoción y Marketing', 'Promociona tus servicios en las principales plataformas.')}>
            Promoción y Marketing
          </p>
          <p onClick={() => handleSectionClick('Programas de Coaching', 'Participa en programas diseñados para tu crecimiento profesional.')}>
            Programas de Coaching
          </p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Contacto</h4>
          <p>Colombia Norte de Santander</p>
          <p>+57 302 000 0100</p>
          <p>info@tokenautas.com</p>
        </div>
      </div>

      <div className="gpt3__footer-copyright">
        <p>@2024 Tokenautas. Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Footer;

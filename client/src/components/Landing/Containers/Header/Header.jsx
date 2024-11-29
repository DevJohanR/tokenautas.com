import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './Header.module.css';
import people from '/fondos/people.png';
import ai from '/fondos/imagenHeroPrincipal.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [whatsapp, setWhatsapp] = useState('');

  const handleButtonClick = async () => {
    if (!whatsapp || !/^\+?\d+$/.test(whatsapp)) {
      Swal.fire({
        title: 'Número inválido',
        text: 'Por favor ingresa un número de WhatsApp válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const response = await fetch('https://tokenautasreact-node.onrender.com/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp }),
      });

      if (response.ok) {
        Swal.fire({
          title: '¡Gracias!',
          text: 'Tu número ha sido registrado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setWhatsapp(''); // Limpia el input
      } else {
        throw new Error('No se pudo guardar tu número.');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar tu número. Inténtalo más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className={`${styles.gpt3__header} section__padding`} id="home">
      <div className={styles["gpt3__header-content"]}>
        <h1 className={styles["gradient__text"]}>Vende tus tokens de manera rápida</h1>
        <p>Recibimos todos los tokens Chaturbate, bongacams, fácil y rápido, recibe tu dinero en la cuenta bancaria que desees. Si necesitas asesoría con gusto respondemos todas tus preguntas, escribe tu WhatsApp y te contactaremos</p>

        <div className={styles["gpt3__header-content__input"]}>
          <input
            type="text"
            placeholder="Escribe aquí tu WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <button type="button" onClick={handleButtonClick}>
            Enviar!
          </button>
        </div>

        <div className={styles["gpt3__header-content__people"]}>
          <img src={people} alt="people" />
          <p>1,600 modelos registrados a nivel nacional</p>

          <div className={styles.buttonActionMobile}>
            <Link to="/login"><button type="button">Ingresar</button></Link>
            <Link to="/register"><button type="button">Registrarse</button></Link>
          </div>
        </div>
      </div>

      <div className={styles["gpt3__header-image"]}>
        <img src={ai} alt="ai" />
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import styles from './Header.module.css';
import people from '/fondos/people.png';
import ai from '/fondos/imagenHeroPrincipal.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Header = () => {
  const handleButtonClick = () => {
    Swal.fire({
      title: 'Aún estamos en fase beta',
      text: 'Pronto nuestra base de datos estará funcional para recibir tu información',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  };

  return (
    <div className={`${styles.gpt3__header} section__padding`} id="home"> {/* Asumiendo que `section__padding` es global */}
      <div className={styles["gpt3__header-content"]}>
        <h1 className={styles["gradient__text"]}>Vende tus tokens de manera rápida</h1>
        <p>Recibimos todos los tokens Chaturbate, bongacams, fácil y rápido, recibe tu dinero en la cuenta bancaria que desees. Si necesitas asesoría con gusto respondemos todas tus preguntas, escribe tu WhatsApp y te contactaremos</p>

        <div className={styles["gpt3__header-content__input"]}>
          <input type="email" placeholder="Escribe aquí tu WhatsApp" />
          <button type="button" onClick={handleButtonClick}>Enviar!</button>
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

import React from 'react';
import styles from './Header.module.css';
import people from '/fondos/people.png'
import ai from '/fondos/imagenHeroPrincipal.png';

const Header = () => (
  <div className={`${styles.gpt3__header} section__padding`} id="home"> {/* Asumiendo que `section__padding` es global */}
    <div className={styles["gpt3__header-content"]}>
      <h1 className={styles["gradient__text"]}>Vende tus tokens de manera rapida 
</h1>
      <p>Recibimos todos los tokens
Chaturbate, bongacams, facil y rapido, recibe tu dinero en la cuenta bancaria que desees. Si necesitas asesoria con gusto respondemos todas tus preguntas, escribe tu WhatsApp y te contactaremos</p>

      <div className={styles["gpt3__header-content__input"]}>
        <input type="email" placeholder="Escribe aqui tu WhatsApp" />
        <button type="button">Enviar!</button>
      </div>

      <div className={styles["gpt3__header-content__people"]}>
      <img src={people} />
        <p>1,600 modelos registrados a nivel nacional</p>
      </div>
    </div>

    <div className={styles["gpt3__header-image"]}>
      <img src={ai} alt="ai" />
    </div>
  </div>
);

export default Header;

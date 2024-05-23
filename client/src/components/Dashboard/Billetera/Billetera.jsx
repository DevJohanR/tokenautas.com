import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Billetera.module.css'; // Asegúrate de que esto coincida con el nombre de tu archivo CSS

function TarjetaCripto({ nombre, abreviatura, imagenSrc, hue, ruta }) {
  const navigate = useNavigate();
  
  const cardStyles = {
    '--hue': hue.toString(),
    'backgroundImage': `url(${imagenSrc})`,
    'backgroundSize': 'cover',
    'backgroundPosition': 'center',
    'textAlign': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'position': 'relative',
    'cursor': 'pointer', // Para indicar que es clicable
  };

  const handleClick = () => {
    navigate(ruta);
  };

  return (
    <li className={styles.main__card} style={cardStyles} onClick={handleClick}>
      <div className={styles.overlay}></div> {/* Nueva capa para la transparencia oscura */}
      <div className={styles.main__card_image_container} />
      <h3 className={styles.main__card_heading}>{nombre}</h3>
      <p className={styles.main__card_heading_sub}>{abreviatura}</p>
      <p className={styles.main__card_heading_type}></p>
    </li>
  );
}

export default TarjetaCripto;

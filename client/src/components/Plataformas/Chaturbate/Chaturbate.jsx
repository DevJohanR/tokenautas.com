import React, { useState } from 'react';
import { FaCompress } from 'react-icons/fa';
import styles from './Chaturbate.module.css';

const Chatur = ({ fondoAutenticacion, chaturbateInfoImg, profileLink, tokenautasLink, whatsappLink, paragraph }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgChaturbate}>
        <img src={fondoAutenticacion} alt="Fondo Autenticación" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.containerCharturbateImg} onClick={handleImageClick}>
          <p className={styles.callToAction}>¡Toca la imagen para verla en pantalla completa!</p>
          <img src={chaturbateInfoImg} alt="Información Chaturbate" />
        </div>
        <p className={styles.parrafo}>
          {paragraph}
        </p>
        <button 
          className='w-full py-2 mt-4 text-lg flex items-center justify-center border border-gray-300' 
          style={{
            background: 'linear-gradient(#ff21bc, #b21783)',
            width: "200px",
            color: "white",
            padding: '5px 15px',
            borderRadius: '0.5em',
            textTransform: 'uppercase',
            fontWeight: '600',
            boxShadow: 'inset 2px 2px 2px rgba(255, 255, 255, 0.4), inset -5px -10px 10px #b1147d'
          }}
          onClick={() => window.location.href = whatsappLink}
        >
          ¡Vender Ahora!
        </button>
      </div>

      {isFullscreen && (
        <div className={styles.fullscreenModal}>
          <FaCompress className={styles.closeIcon} onClick={handleCloseFullscreen} />
          <img src={chaturbateInfoImg} alt="Información Chaturbate en Pantalla Completa" className={styles.fullscreenImage} />
        </div>
      )}
    </div>
  );
}

export default Chatur;

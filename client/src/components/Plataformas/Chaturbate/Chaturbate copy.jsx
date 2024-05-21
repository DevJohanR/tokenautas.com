import React, { useState } from 'react';
import fondoAutenticacion from '/plataformasDashboard/chaturbate.png';
import { FaCompress } from 'react-icons/fa'; // Añadir ícono de compresión
import styles from './Chaturbate.module.css';



const Chatur = () => {
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
        <img src={fondoAutenticacion} alt="" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.containerCharturbateImg} onClick={handleImageClick}>
          <p className={styles.callToAction}>¡Toca la imagen para verla en pantalla completa!</p>
          <img src="./plataformas/chaturbateInformacion.png" alt="" />
        </div>
     <p className={styles.parrafo} > Ingresa a nuestro perfil en <a href="https://chaturbate.com" className="text-blue-500 underline">Chaturbate.com</a> y escribe el correo con el cual te registraste en <a href="https://tokenautas.com" className="text-blue-500 underline">tokenautas.com</a>, <span> + </span> la cantidad de tokens y presiona "Enviar Propina". Toma un "pantallazo"... ¡Listo! ¡Lo has logrado!<br />
                Para recibir tu dinero, regresa de nuevo a este dashboard y presiona el botón "WhatsApp". Envíanos el "pantallazo" que tomaste a nuestro WhatsApp para desembolsarte tu dinero de inmediato.   <span style={{ cursor: 'pointer' }}>Ver tutorial - Clic Aquí!</span></p>
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
  onClick={() => window.location.href = 'https://chaturbate.com/tokenauta/'}
>
  ¡Vender Ahora!
</button>


      </div>

      {isFullscreen && (
        <div className={styles.fullscreenModal}>
          <FaCompress className={styles.closeIcon} onClick={handleCloseFullscreen} />
          <img src="./plataformas/chaturbateInformacion.png" alt="" className={styles.fullscreenImage} />
        </div>
      )}
    </div>
  );
}

export default Chatur;

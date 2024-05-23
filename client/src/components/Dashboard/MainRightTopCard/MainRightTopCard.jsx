import React from 'react';
import TarjetaCripto from "../Billetera/Billetera";
import styles from './MainRightTopCard.module.css'; // Asegúrate de que este nombre coincida con el de tu archivo CSS

const criptoData = [
  {
    nombre: "",
    abreviatura: "Bitcoin",
    imagenSrc: "/plataformasDashboard/BBB.webp", // Ruta a la imagen en la carpeta public
    hue: 0,
    ruta: "/bitcoin"
  },
  {
    nombre: "",
    abreviatura: "Tether",
    imagenSrc: "/plataformasDashboard/TTT.webp", // Ruta a la imagen en la carpeta public
    hue: 180,
    ruta: "/tether"
  }
];

function MainRightTopCard() {
  return (
    <div className={styles.topCard}>
      <div className={styles.topCard_name}>
        <div className={styles.texto}>
          <h2 className={styles.billeterasTop}>BILLETERAS</h2>
          <p className={styles.billeterasDescripcion}>
            Utilízalas para recibir regalos de tus <strong>tippers.</strong> Envíales el código QR e infórmales que deseas recibir criptomonedas, <span className={styles.tutorialCriptomonedas}><a href="">¡Ver tutorial aquí!</a></span>
          </p>
        </div>
      </div>
      <div className="earning">
        <ul>
          {criptoData.map((data, index) => (
            <TarjetaCripto
              key={index}
              nombre={data.nombre}
              abreviatura={<span className={styles.abreviatura}>{data.abreviatura}</span>}
              imagenSrc={data.imagenSrc}
              hue={data.hue}
              ruta={data.ruta}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainRightTopCard;

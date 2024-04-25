import React from "react";
import TarjetaCripto from "../Billetera/Billetera";
import styles from './MainRightTopCard.module.css'; // Make sure this matches the name of your CSS file


function MainRightTopCard({ criptoData }) {
  return (
    <div className="topCard">
      <div className="topCard_name">
        <div className={styles.texto}>
        <h2 className={styles.billeterasTop} >BILLETERAS</h2>
        <p className={styles.billeterasDescripcion}>
          Utilizalas para recibir regalos de tus <strong>tippers.</strong> Enviales el codigo QR e informales que deseas recibir criptomonedas,  <span className={styles.tutorialCriptomonedas} ><a href="">¡Mira el tutorial de criptomonedas aqui!</a></span>
        </p>
        
        </div>
       
   
      </div>
      <div className="earning">
        
        <ul>
          {criptoData.map((data, index) => (
            <TarjetaCripto
              key={index}
              nombre={data.nombre}
              abreviatura={data.abreviatura}
              imagenSrc={data.imagenSrc}
              hue={data.hue}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainRightTopCard;

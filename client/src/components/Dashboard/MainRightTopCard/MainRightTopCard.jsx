import React from "react";
import TarjetaCripto from "../Billetera/Billetera";

function MainRightTopCard({ criptoData }) {
  return (
    <div className="topCard">
      <div className="topCard_name">
        <h2>Billeteras</h2>
   
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

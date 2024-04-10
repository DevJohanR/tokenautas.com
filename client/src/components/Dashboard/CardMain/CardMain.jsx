import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

function CardMain({ imgSrc, title, hearts }) {
  return (
    <div className="card_main">
      <img src={imgSrc} alt="" className="card_main_img" />
      <div className="card_main_name">
        <h2>{title}</h2>

        <div className="card_icon">
          <i>
            <BsFillHeartFill /> <span>{hearts}</span>
          </i>
        </div>
      </div>

      <div className="stats">
        <div>
          <p>
            Token USD<span>$1</span>
          </p>
        </div>
        <div>
          <p>
            Token COP<span>$4000</span>
          </p>
        </div>
      </div>

      <div className="card_button">
        <a href="#" className="button1 btn">
          Vender
        </a>
        <a href="#" className="button2 btn">
          Historial
        </a>
      </div>
    </div>
  );
}

export default CardMain;

import React from "react";
import TopSeller from "../TopSeller/TopSeller";

function MainRightBottomCard() {
  return (
    <div className="bottomRightCard">
      <div className="bottomName">
        <h2>Mi Estudio Webcam</h2>
        <a href="#"></a>
      </div>

      {TopSeller &&
        TopSeller.map((seller) => (
          <div className="topSeller" key={seller.id}>
            <div className="topSellerImg">
              <img src={seller?.imgSrc} alt="" />
            </div>
            
            <div className="topSellerName">
              <p>
                {seller?.seller_name} <span>{seller?.username}</span>
              </p>
            </div>
            <a href="#" className="button1 btn">
              Editar
            </a>
          </div>
        ))}
    </div>
  );
}

export default MainRightBottomCard;

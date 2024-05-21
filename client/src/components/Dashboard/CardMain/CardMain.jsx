import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

function CardMain({ imgSrc, title }) {
  const shareUrl = "https://tokenautas.com"; // URL principal
  const shareText = `Vende tus tokens Aquí: ${title}`;

  const shareButtonStyle = {
    display: "inline-block",
    marginRight: "5px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "1.5em",
  };

  const shareButtonStyleSmall = {
    ...shareButtonStyle,
    fontSize: "1em",
  };

  const isSmallScreen = window.matchMedia("(max-width: 1366px)").matches;

  const priceStyle = {
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif", // Añadir la fuente aquí
    fontWeight: 600,
  };

  return (
    <div className="card_main">
      <img src={imgSrc} alt="" className="card_main_img" />
      <div className="card_main_name">
        <h2>{title}</h2>
        <div className="card_icon">
          <FacebookShareButton
            url={shareUrl}
            quote={shareText}
            hashtag="#tokenautas"
            style={isSmallScreen ? shareButtonStyleSmall : shareButtonStyle}
          >
            <FaFacebook />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={shareText}
            via="tokenautas"
            hashtags={["tokenautas"]}
            style={isSmallScreen ? shareButtonStyleSmall : shareButtonStyle}
          >
            <FaTwitter />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={shareText}
            separator=":: "
            style={isSmallScreen ? shareButtonStyleSmall : shareButtonStyle}
          >
            <FaWhatsapp />
          </WhatsappShareButton>
        </div>
      </div>
      <div className="stats">
        <div>
          <p style={priceStyle}>
            Valor-Token<span>$1</span>
          </p>
        </div>
        <div>
          <a href="#" className="button1 btn">
            Vender
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardMain;

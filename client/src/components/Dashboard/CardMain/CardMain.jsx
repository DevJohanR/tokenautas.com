import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

function CardMain({ imgSrc, title, hearts }) {
  const shareUrl = "https://tokenautas.com/blogpage"; // URL pública
  const shareText = `Vende tus tokens Aqui: ${title}`;
 

  const shareButtonStyle = {
    display: "inline-block",
    marginRight: "5px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "1.5em",
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
            style={shareButtonStyle}
          >
            <FaFacebook />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={shareText}
            via="tokenautas"
            hashtags={["tokenautas"]}
            style={shareButtonStyle}
          >
            <FaTwitter />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={shareText}
            separator=":: "
            style={shareButtonStyle}
          >
            <FaWhatsapp />
          </WhatsappShareButton>
        </div>
      </div>
      <div className="stats">
        <div>
          <p>
            Precio del Token USD<span>$1</span>
          </p>
        </div>
        <div>
          <a href="#" className="button1 btn">
            Vender Tokens
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardMain;

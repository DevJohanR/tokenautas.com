import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./MainContainer.css";
import axios from "axios";

import Banner from "/fondos/BannerDash.webp";
import CardMain from "../CardMain/CardMain";
import Card1 from "../../../../public/plataformasDashboard/chaturbate.png";
import Card2 from "../../../../public/plataformasDashboard/xvideoscams.png";
import Card3 from "../../../../public/plataformasDashboard/stripchat.png";
import Card4 from "../../../../public/plataformasDashboard/camsoda.png";
import Card5 from "../../../../public/plataformasDashboard/cam4.png";
import Card6 from "../../../../public/plataformasDashboard/bonga.png";

import MainRightBottomCard from "../MainRightBottomCard/MainRightBottomCard";
import MainRightTopCard from "../MainRightTopCard/MainRightTopCard";


const criptoData = [
  {
    nombre: "Bitcoin",
    abreviatura: "BTC",
    imagenSrc: "/fondos/bt.jpeg",
    hue: "25",
  },
  {
    nombre: "Ethereum",
    abreviatura: "ETH",
    imagenSrc: "/fondos/tete.jpeg",
    hue: "200",
  },
];

function MainContainer() {
  const [username, setUsername] = useState("");
  const [walletBalance, setWalletBalance] = useState("Cargando...");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No se encontró el userId");
      return;
    }

    axios
      .get(`https://tokenautasreact-node.onrender.com/users/username/${userId}`)
      .then((response) => setUsername(response.data.username))
      .catch((error) =>
        console.error("Hubo un error al obtener el nombre de usuario", error)
      );
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`https://tokenautasreact-node.onrender.com/users/wallet/${userId}`)
        .then((response) => setWalletBalance(response.data.mi_billetera1))
        .catch((error) => {
          console.error("Hubo un error al obtener el balance de la billetera", error);
          setWalletBalance("Error al cargar");
        });
    } else {
      setWalletBalance("Usuario no identificado");
    }
  }, []);

  const handleSellClick = (platform) => {
    if (platform === "Chaturbate") {
      window.location.href = "/chaturbate";
    } else {
      Swal.fire({
        title: "Aviso",
        text: `Por ahora solo estamos comprando tokens de Chaturbate`,
        icon: "info",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handlePriceClick = () => {
    // Ahora redirige a /formulario
    window.location.href = "/formulario";
  };

  return (
    <div className="mainContainer">
      <div className="left">
        <div
          className="banner"
          style={{
            background: `url(${Banner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              zIndex: 1,
            }}
          ></div>

          <div
            className="textContainer"
            style={{
              position: "relative",
              zIndex: 2,
              padding: "20px",
              marginLeft: "30px",
            }}
          >
            <h1>TU SALDO</h1>
            <h2>{walletBalance}</h2>
            <p>{username}</p>
            <div className="bid">
              <Link to="/retirar">
                <button className="button1">Retirar</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="cards">
          <div className="filters">
            <div className="popular">
              <h2>VENDE TUS TOKENS</h2>
            </div>
          </div>

          <main>
            <CardMain
              imgSrc={Card1}
              title={"Chaturbate"}
              onSellClick={() => handleSellClick("Chaturbate")}
              onPriceClick={handlePriceClick}
            />
            <CardMain
              imgSrc={Card2}
              title={"XvideosCams"}
              onSellClick={() => handleSellClick("XvideosCams")}
              onPriceClick={handlePriceClick}
            />
            <CardMain
              imgSrc={Card3}
              title={"Stripchat"}
              onSellClick={() => handleSellClick("Stripchat")}
              onPriceClick={handlePriceClick}
            />
            <CardMain
              imgSrc={Card4}
              title={"Camsoda"}
              onSellClick={() => handleSellClick("Camsoda")}
              onPriceClick={handlePriceClick}
            />
            <CardMain
              imgSrc={Card5}
              title={"Cam4"}
              onSellClick={() => handleSellClick("Cam4")}
              onPriceClick={handlePriceClick}
            />
            <CardMain
              imgSrc={Card6}
              title={"BongaCams"}
              onSellClick={() => handleSellClick("BongaCams")}
              onPriceClick={handlePriceClick}
            />
          </main>
        </div>
      </div>
      <div className="right">
        <MainRightTopCard criptoData={criptoData} />
        <MainRightBottomCard />
      </div>
    </div>
  );
}

export default MainContainer;

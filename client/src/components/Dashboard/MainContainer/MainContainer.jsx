import React, { useState, useEffect } from 'react';
import './MainContainer.css';
import axios from 'axios';


import Banner from "/fondos/BannerDash.webp";
import CardMain from "../CardMain/CardMain";
import Card1 from "../../../../public/plataformasDashboard/chaturbate.png";
import Card2 from "../../../../public/plataformasDashboard/xvideoscams.png";
import Card3 from "../../../../public/plataformasDashboard/stripchat.png";
import Card4 from "../../../../public/plataformasDashboard/camsoda.png";
import Card5 from "../../../../public/plataformasDashboard/cam4.png";
import Card6 from "../../../../public/plataformasDashboard/cam4.png";


import MainRightBottomCard from "../MainRightBottomCard/MainRightBottomCard";
import MainRightTopCard from "../MainRightTopCard/MainRightTopCard";

// Aquí definimos los datos de las criptomonedas que queremos mostrar
const criptoData = [
  {
    nombre: "Bitcoin",
    abreviatura: "BTC",
    imagenSrc: "/fondos/bt.jpeg", // Asumiendo que ya tienes una imagen para Bitcoin en Card1
    hue: "25", // Este es un valor de ejemplo para el tono de color de la sombra
  },
  {
    nombre: "Ethereum",
    abreviatura: "ETH",
    imagenSrc: "/fondos/tete.jpeg", // Asumiendo que ya tienes una imagen para Ethereum en Card2
    hue: "200", // Este es un valor de ejemplo para el tono de color de la sombra
  },
  // Puedes añadir más tarjetas de criptomonedas aquí
];

function MainContainer() {

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Suponiendo que guardas el userId en localStorage después del login
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('Usuario no ha iniciado sesión');
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        // Suponiendo que tu backend devuelve un objeto de usuario con una propiedad 'username'
        setUsername(response.data.username);
        setError('');
      })
      .catch((err) => {
        console.error('Error al obtener los datos del usuario:', err);
        setError('No se pudo cargar la información del usuario.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando perfil del usuario...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="mainContainer">
       <div className="left">
        <div className="banner" style={{
            background: `url(${Banner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          
          }}>

        <div className="textContainer">
        <h1>TU SALDO</h1>

          <h2>$ 1.000.000</h2>
          <p>{username}</p>
          <div className="bid">
            <a href="#" className="button1">
                Depositar
            </a>
            <p>
              <span></span>
            </p>
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
          <CardMain imgSrc={Card1} title={"Chaturbate"} hearts={"+"} />
          <CardMain imgSrc={Card2} title={"Xvideoscams"} hearts={"+"} />
          <CardMain imgSrc={Card3} title={"Stripchat"} hearts={"+"} />
          <CardMain imgSrc={Card4} title={"Camsoda"} hearts={"+"} />
          <CardMain imgSrc={Card5} title={"Cam4"} hearts={"+"} />
          <CardMain imgSrc={Card6} title={"LiveJasmin"} hearts={"+"} />
         
          </main>
        </div>

      
      </div>
      <div className="right">
        {/* Pasamos los datos de criptomonedas al componente MainRightTopCard */}
        <MainRightTopCard criptoData={criptoData} />
        <MainRightBottomCard />
      </div>
    </div>
  );
}

export default MainContainer;

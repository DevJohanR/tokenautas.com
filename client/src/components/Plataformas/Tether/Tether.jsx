//Tether/Tether.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Tether.module.css"
import GetUImagenUSDT from './GetUImagenUSDT';
import { FaRegCopy } from "react-icons/fa";


const Tether = () => {
  const [walletBTCImage, setWalletBTCImage] = useState('');
  const [userId, setUserId] = useState(null); // Agrega este estado para almacenar el userId
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Obtén el userId de localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Actualiza el estado con el userId
      fetch(`https://tokenautasreact-node.onrender.com/users/tether/${storedUserId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo obtener la imagen');
          }
          return response.json();
        })
        .then(data => {
          setWalletBTCImage(data.imagenbtc);
        })
        .catch(error => {
          console.error('Error al obtener la imagen BTC:', error);
        });
    } else {
      navigate('/login'); // Si no hay userId, redirige al usuario a la página de inicio de sesión.
    }
  }, [navigate]);

  return (
    <div className={styles.Bitcoin}>
           <div className={styles.imagenBitcoin}>{userId && <GetUImagenUSDT userId={userId} />}</div>
      
           <div className={styles.descripcionBitcoin}>
            <h1>TETHER</h1>
            <span><strong> DESCARGO DE RESPONSABILIDAD DEPOSITOS EN USDT DE LA RED TRC20:</strong> ANTES DE RECIBIR TUS TETHER NUNCA DEBES OLVIDAR TENER EN CUENTA LAS SIGUIENTES RECOMENDACIONES:</span>
            <p>Por favor, tenga en cuenta que los depósitos realizados en Tether <strong>(USDT) </strong> de la red TRC20 deben ser realizados con precaución y entendimiento pleno de los riesgos asociados. Activos Digitales no se hace responsable de pérdidas, retrasos o cualquier otro inconveniente causado por depósitos en Tether <strong>(USDT).</strong> de la red TRC20. Recomendamos encarecidamente verificar la dirección del monedero y confirmar la compatibilidad con la red TRC20 antes de realizar cualquier depósito. Además, le recomendamos que se informe sobre los procedimientos de seguridad adecuados para el almacenamiento y la gestión de criptomonedas.</p>
            <span className={styles.billetera}>  <FaRegCopy /> 14512415451054105
</span>
            
        </div>
    
    </div>
  );
}

export default Tether;

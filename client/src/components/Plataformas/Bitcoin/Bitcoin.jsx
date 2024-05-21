import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUImagenBTC from './GetUImagenBTC';
import axios from 'axios';
import styles from './Bitcoin.module.css'

const Bitcoin = () => {
  const [userId, setUserId] = useState(null);
  const [walletBTCImage, setWalletBTCImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Obtén el userId de localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Actualiza el estado con el userId
      axios.get(`https://tokenautasreact-node.onrender.com/users/btc/${storedUserId}`)
        .then(response => {
          if (response.status === 200) {
            setWalletBTCImage(response.data.imagenbtc);
          } else {
            throw new Error('No se pudo obtener la imagen');
          }
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

      
        <div className={styles.imagenBitcoin}>
            {userId && <GetUImagenBTC userId={userId} />}
        </div>

        <div className={styles.descripcionBitcoin}>
            <h1>BITCOIN</h1>
            <span>DESCARGO DE RESPONSABILIDAD PARA DEPOSITOS EN BITCOIN (BTC): ANTES DE RECIBIR TUS BITCOIN NUNCA DEBES OLVIDAR TENER EN CUENTA LAS SIGUIENTES RECOMENDACIONES:</span>
            <p>Por favor, tenga en cuenta que los depósitos realizados en Bitcoin (BTC) deben ser realizados con precaución y entendimiento pleno de los riesgos asociados. Activos Digitales no se hace responsable de pérdidas, retrasos o cualquier otro inconveniente causado por depósitos en Bitcoin (BTC). Los depósitos en Bitcoin están sujetos a volatilidad del mercado y fluctuaciones de precios inherentes a la criptomoneda. Es responsabilidad del remitente asegurarse de enviar los fondos correctamente y de manera segura a la dirección proporcionada. Recomendamos encarecidamente verificar la dirección del monedero y confirmar la precisión antes de realizar cualquier depósito. Además, le recomendamos que se informe sobre los procedimientos de seguridad adecuados para el almacenamiento y la gestión de criptomonedas.</p>
            <span>ID: 14512415451054105</span>
        </div>
    </div>
);
}

export default Bitcoin;

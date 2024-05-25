import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUImagenBTC from './GetUImagenBTC';
import axios from 'axios';
import styles from './Bitcoin.module.css';
import { FaRegCopy } from "react-icons/fa";
import MostrarBitcoin from '../../Funciones/Mostrar-Bitcoin/MostrarBitcoin';
import Swal from 'sweetalert2';

const Bitcoin = () => {
  const [userId, setUserId] = useState(null);
  const [walletBTCImage, setWalletBTCImage] = useState('');
  const mostrarBitcoinRef = useRef();
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

  const copiarAlPortapapeles = () => {
    const walletBTC = mostrarBitcoinRef.current.getWalletBTC();
    if (walletBTC) {
      navigator.clipboard.writeText(walletBTC).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Copiado',
          text: `Wallet BTC copiado al portapapeles: ${walletBTC}`,
        });
      }).catch((error) => {
        console.error('Error al copiar al portapapeles:', error);
      });
    }
  };

  return (
    <div className={styles.Bitcoin}>
      <div className={styles.imagenBitcoin}>
        {userId && <GetUImagenBTC userId={userId} />}
      </div>

      <div className={styles.descripcionBitcoin}>
        <h1>BITCOIN</h1>
        <span className={styles.disclamer}><strong>DESCARGO DE RESPONSABILIDAD PARA DEPÓSITOS EN BITCOIN (BTC):</strong></span>
        <p>Por favor, tenga en cuenta que los depósitos realizados en Bitcoin <strong>(BTC)</strong> deben realizarse con pleno entendimiento de los riesgos asociados. Activos Digitales no se responsabiliza por pérdidas, retrasos u otros inconvenientes derivados de depósitos en <strong>(BTC).</strong> ya que estos están sujetos a la volatilidad del mercado. Es responsabilidad del remitente asegurar el envío correcto de los fondos a la dirección proporcionada, verificando y confirmando su precisión antes de realizar cualquier depósito. Además, recomendamos informarse sobre los procedimientos de seguridad para la gestión de criptomonedas.</p>
        <h1>Billetera:</h1>
        <span className={styles.billetera}>
          <FaRegCopy onClick={copiarAlPortapapeles} style={{cursor: "pointer"}} />
          <MostrarBitcoin ref={mostrarBitcoinRef} />
        </span>
      </div>
    </div>
  );
};

export default Bitcoin;

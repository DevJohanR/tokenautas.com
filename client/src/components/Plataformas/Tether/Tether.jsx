import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Tether.module.css";
import GetUImagenUSDT from './GetUImagenUSDT';
import axios from 'axios';
import { FaRegCopy } from "react-icons/fa";
import MostrarTether from '../../Funciones/Mostrar-Tether/MostrarTether';
import Swal from 'sweetalert2';

const Tether = () => {
  const [userId, setUserId] = useState(null);
  const [walletBTCImage, setWalletBTCImage] = useState('');
  const mostrarTetherRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Obtén el userId de localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Actualiza el estado con el userId
      axios.get(`https://tokenautasreact-node.onrender.com/users/tether/${storedUserId}`)
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
    const walletUSDT = mostrarTetherRef.current.getWalletUSDT();
    if (walletUSDT) {
      navigator.clipboard.writeText(walletUSDT).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Información copiada',
          text: `La información copiada es: ${walletUSDT}`,
        });
      }).catch((error) => {
        console.error('Error al copiar al portapapeles:', error);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay información para copiar',
      });
    }
  };

  return (
    <div className={styles.Bitcoin}>
      <div className={styles.imagenBitcoin}>
        {userId && <GetUImagenUSDT userId={userId} />}
      </div>
      <div className={styles.descripcionBitcoin}>
        <h1>TETHER</h1>
        <span>
          <strong>DESCARGO DE RESPONSABILIDAD DEPOSITOS EN USDT DE LA RED TRC20:</strong> 
        </span>
        <p>
          Por favor, tenga en cuenta que los depósitos realizados en Tether <strong>(USDT) </strong> de la red TRC20 deben ser realizados con precaución y entendimiento pleno de los riesgos asociados. Activos Digitales no se hace responsable de pérdidas, retrasos o cualquier otro inconveniente causado por depósitos en Tether <strong>(USDT).</strong> de la red TRC20. Recomendamos encarecidamente verificar la dirección del monedero y confirmar la compatibilidad con la red TRC20 antes de realizar cualquier depósito. Además, le recomendamos que se informe sobre los procedimientos de seguridad adecuados para el almacenamiento y la gestión de criptomonedas.
        </p>
        <span className={styles.billetera}>
          <FaRegCopy onClick={copiarAlPortapapeles} style={{cursor: "pointer"}} />
          <MostrarTether ref={mostrarTetherRef} />
        </span>
      </div>
    </div>
  );
};

export default Tether;

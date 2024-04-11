import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoAutenticacion from '/fondos/bitcoin.webp';

import GetUImagenUSDT from './GetUImagenUSDT';

const Bitcoin = () => {
  const [walletBTCImage, setWalletBTCImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Asegúrate de que 'userId' se ha guardado en localStorage
    if (userId) {
      fetch(`https://tokenautas-com.onrender.com/users/btc/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo obtener la imagen');
          }
          return response.json();
        })
        .then(data => {
          setWalletBTCImage(data.imagenbtc); // Asegúrate de que la clave 'imagenbtc' coincide con la respuesta de tu API
        })
        .catch(error => {
          console.error('Error al obtener la imagen BTC:', error);
        });
    }
  }, []);

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center h-screen w-screen'>
      <div className='w-full lg:w-1/2 h-screen bg-center bg-cover flex items-center justify-center'>  {walletBTCImage && <img src={walletBTCImage} alt="Wallet BTC" />}
            <GetUImagenUSDT userId={35} />

      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center bg-white'>
        <div className='w-full max-w-md p-8'>
          <h2 className='text-3xl font-bold text-center mb-8'>¿Como vender mis Bitcoin?</h2>
          <div className='flex flex-col space-y-4'>
          

          </div>
        </div>
      </div>
    </div>
  );
}

export default Bitcoin;

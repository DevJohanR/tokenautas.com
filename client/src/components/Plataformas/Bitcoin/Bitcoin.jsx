import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUImagenBTC from './GetUImagenBTC';
import axios from 'axios';

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

    <div className='flex flex-col lg:flex-row items-center justify-center h-screen w-screen'>
      <div className='w-full lg:w-1/2 h-screen bg-center bg-cover flex items-center justify-center'>
        {userId && <GetUImagenBTC userId={userId} />}
      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center bg-white'>
        <div className='w-full max-w-md p-8'>
          <h2 className='text-3xl font-bold text-center mb-8'>¿Cómo vender mis Bitcoin?</h2>
        </div>
      </div>
    </div>
  );
}

export default Bitcoin;

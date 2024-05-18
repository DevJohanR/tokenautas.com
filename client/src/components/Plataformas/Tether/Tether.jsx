//Tether/Tether.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GetUImagenUSDT from './GetUImagenUSDT';

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
    <div className='flex flex-col lg:flex-row items-center justify-center h-screen w-screen'>
      <div className='w-full lg:w-1/2 h-screen bg-center bg-cover flex items-center justify-center'>
      
        {userId && <GetUImagenUSDT userId={userId} />} {/* Usa el userId del estado aquí */}
      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center bg-white'>
        <div className='w-full max-w-md p-8'>
          <h2 className='text-3xl font-bold text-center mb-8'>¿Cómo vender mis usdt?</h2>

          <div className='flex flex-col space-y-4'>
          

          </div>
        </div>
      </div>
    </div>
  );
}

export default Tether;

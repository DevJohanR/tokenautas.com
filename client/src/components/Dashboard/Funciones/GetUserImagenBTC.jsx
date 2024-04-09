// Archivo nuevo, por ejemplo GetUserImagenBTC.js en la carpeta de componentes de React

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUserImagenBTC = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/users/btc/${userId}`)
      .then((response) => {
        setUser(response.data);
        setError('');
      })
      .catch((err) => {
        console.error('Error al obtener la imagen BTC del usuario:', err);
        setError('No se pudo cargar la imagen BTC del usuario.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Cargando imagen BTC...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Imagen BTC no encontrada.</div>;

  return (
    <div>
      <h1>Imagen BTC del Usuario</h1>
      <img src={`http://localhost:3001/assets/${user.imagenbtc.replace('assets/', '')}`} alt={`${user.username}'s Wallet BTC`} />
    </div>
  );
};

export default GetUserImagenBTC;

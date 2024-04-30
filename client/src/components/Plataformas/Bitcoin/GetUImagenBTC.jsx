//Bitcoin/GetUImagenBTC.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUImagenBTC = ({ userId }) => {
  const [imageBTC, setImageBTC] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/users/btc/${userId}`)
      .then((response) => {
        setImageBTC(response.data.imagenbtc);
        setError('');
      })
      .catch((err) => {
        console.error('Error al obtener la imagen BTC:', err);
        setError('No se pudo cargar la imagen BTC.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!imageBTC) return <div>No se encontró la imagen.</div>;

  return (
    <img src={`http://localhost:3001/assets/${imageBTC.replace('assets/', '')}`} alt="Bitcoin Wallet" />
  );
};

export default GetUImagenBTC;

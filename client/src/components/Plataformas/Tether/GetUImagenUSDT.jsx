//Tether/GetUImagenUSDT.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUImagenUSDT = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`https://tokenautasreact-node.onrender.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setError('');
      })
      .catch((err) => {
        console.error('Error al obtener los datos del usuario:', err);
        setError('No se pudo cargar la información del usuario.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Cargando perfil del usuario...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No se encontró el usuario.</div>;

  return (
    <div>
      {/* Si necesitas un contenedor aquí, puedes mantener el div o quitarlo si no es necesario */}
      <img src={`https://tokenautasreact-node.onrender.com/assets/${user.imagenusdt.replace('assets/', '')}`} alt="Wallet" />
    </div>
  );
};

export default GetUImagenUSDT;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUImagenUSDT = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`https://tokenautas-com.onrender.com/users/${userId}`)
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
      <h1>Perfil de Usuario</h1>
      <p>Nombre de usuario: {user.username}</p>
      <img src={`https://tokenautas-com.onrender.com/assets/${user.imagenusdt.replace('assets/', '')}`} alt={`${user.username}'s Wallet`} />
    </div>
  );
};

export default GetUImagenUSDT;

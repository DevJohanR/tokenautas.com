import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://tokenautasreact-node.onrender.com/users');
        setUsers(response.data); // Asumiendo que la respuesta es un array de usuarios
      } catch (error) {
        console.error('Hubo un error al obtener los datos de los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className='bg-red-500'>Usuarios Registrados</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <p>Username: {user.username}</p>
              <img src={user.imagenusdt} alt="Imagen USDT" />
              <img src={user.imagenbtc} alt="Imagen BTC" />
              {/* Otros detalles del usuario */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios para mostrar.</p>
      )}
    </div>
  );
};

export default UsersInfo;

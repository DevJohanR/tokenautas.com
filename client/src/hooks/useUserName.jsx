import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserName = (userId) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('El ID de usuario no está definido');
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`https://tokenautas-com.onrender.com/users/${userId}`)
      .then((response) => {
        setUsername(response.data.username);
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

  return { username, loading, error };
};

export default useUserName;

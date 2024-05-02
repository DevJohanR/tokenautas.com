import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import fondoAutenticacion from '/fondos/astronautaRegistro.webp';
import GOOGLE_ICON from "/logos/google.svg";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar el indicador de carga

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ambos campos son obligatorios!',
      });
      return;
    }

    if (username.includes('@')) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre de usuario inválido',
        text: 'Para registrarte con tu correo, presiona: REGISTRATE CON GOOGLE',
      });
      return;
    }

    setLoading(true); // Activar el indicador de carga
    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Serás redirigido para iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            setRedirectToLogin(true);
          }
        });
      } else {
        const errorData = await response.json();
        if (errorData.message === 'User already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'El nombre de usuario ya está en uso. Por favor, elige otro.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: errorData.message || 'No se pudo completar el registro.',
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar al servidor, por favor intenta de nuevo.',
      });
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center h-screen w-screen'>
      <div className='w-full lg:w-1/2 h-screen bg-center bg-cover flex items-center justify-center' style={{ backgroundImage: `url(${fondoAutenticacion})` }}>
        <div className='text-center lg:text-left p-8 lg:p-0 lg:m-24'>
          <h1 className='text-4xl text-white font-bold mb-4'>Aumenta tus ingresos con tokenautas</h1>
          <p className='text-xl text-white'>Comienza ahora y disfruta de pagos instantáneos en tu cuenta bancaria</p>
        </div>
      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center bg-white'>
        <div className='w-full max-w-md p-8'>
          <h2 className='text-3xl font-bold text-center mb-8'>Registrarse</h2>
          <div className='flex flex-col space-y-4'>
            <input 
              type="text"
              placeholder='Alias o Nombre de Usuario'
              className='w-full px-4 py-2 border rounded-md text-lg'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password"
              placeholder='Contraseña'
              className='w-full px-4 py-2 border rounded-md text-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              onClick={handleRegister} 
              className='w-full py-2 mt-4 bg-black text-white rounded-md text-lg'
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
            <button 
              className='w-full py-2 mt-4 text-black border border-black rounded-md text-lg'
            > 
              Ingresar 
            </button>
            <div className='relative flex items-center justify-center mt-4'>
              <div className='absolute w-full border-t border-gray-300'></div>
              <div className='relative z-10 px-4 bg-white text-xs lg:text-sm'>o</div>
            </div>
            <button 
              className='w-full py-2 mt-4 text-black rounded-md text-lg flex items-center justify-center border border-gray-300'
            >
              <img src={GOOGLE_ICON} alt="Google" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
              Registrate con Google
            </button>
          </div>
          <p className='mt-4 text-center text-sm'>
            ¿Ya tienes cuenta? 
            <a href="#" className='text-blue-600 hover:underline'> ¡Inicia Sesion aquí!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoAutenticacion from '/fondos/loginTokenautas.webp';
import GOOGLE_ICON from "/logos/google.svg";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Intentando iniciar sesión con:', email, password); // Agregar para depuración
      const response = await fetch('https://tokenautas-com.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      console.log('Respuesta recibida:', response); // Agregar para depuración
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data);
        localStorage.setItem('isAuthenticated', 'true'); // Almacenar el estado de autenticación
        localStorage.setItem('username', data.username); // Almacenar el nombre de usuario recibido
        navigate('/dashboard');
      } else {
        console.log('Error en el login:', response.statusText);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };
  

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
        <h2 className='text-3xl font-bold text-center mb-8'>Ingresar</h2>
          <div className='flex flex-col space-y-4'>
            <input 
              type="email"
              placeholder='Tu nombre de usuario'
              className='w-full px-4 py-2 border rounded-md text-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password"
              placeholder='Tu contraseña'
              className='w-full px-4 py-2 border rounded-md text-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex items-center justify-between'>
              <label className='flex items-center space-x-2'>
                <input type="checkbox" className='form-checkbox' />
                <span className='text-sm'>Recordar siempre</span>
              </label>
              <a href="#" className='text-sm text-blue-600 hover:underline'>¿Olvidaste tu contraseña?</a>
            </div>
            <button 
              onClick={handleLogin} 
              className='w-full py-2 mt-4 bg-black text-white rounded-md text-lg'
            > 
              Ingresar 
            </button>
            
            <Link to='/register' > <button 
              className='w-full py-2 mt-4 text-black border border-black rounded-md text-lg'
            > 
              Registrarse 
            </button></Link>
            <div className='relative flex items-center justify-center mt-4'>
            <div className='absolute w-full border-t border-gray-300'></div>
            <div className='relative z-10 px-4 bg-white text-xs lg:text-sm'>o</div>
          </div>
            <button 
              className='w-full py-2 mt-4 text-black rounded-md text-lg flex items-center justify-center border border-gray-300'
            >
           <img src={GOOGLE_ICON} alt="Google" style={{ height: '20px', width: '20px', marginRight: '10px' }} />

 Ingresar con Google
            </button>
          </div>
          <p className='mt-4 text-center text-sm'>
            ¿No tienes cuenta? 
            <a href="#" className='text-blue-600 hover:underline'> ¡Regístrate aquí!</a>
          </p>
        </div>
      </div>
    </div>
  );
  

}

export default Login;
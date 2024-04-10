import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoAutenticacion from '/plataformasDashboard/chaturbate.png';
import fondoAutenticacion2 from '/plataformas/chaturbateInformacion.png';
import GOOGLE_ICON from "/logos/google.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Intentando iniciar sesión con:', email, password); // Agregar para depuración
      const response = await fetch('http://localhost:3001/users/login', {
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
     {/* <h1 className='text-4xl text-white font-bold mb-4'>Aumenta tus ingresos con tokenautas</h1>
        <p className='text-xl text-white'>Comienza ahora y disfruta de pagos instantáneos en tu cuenta bancaria</p>*/}
      </div>
    </div>
    <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center bg-white'>
      <div className='w-full max-w-md p-8'>
        <h2 className='text-3xl font-bold text-center mb-8'>¿Como vender mis tokens de Chaturbate?</h2>
          <div className='flex flex-col space-y-4'>
            <img src={fondoAutenticacion2} alt="" />
            
            <div className='flex items-center justify-center'>
              <label className='flex items-center space-x-2'>
                
                <span className='text-sm'>Ingresa a Nuestro perfil en Chaturbate.com y Coloca el correo con el cual te registraste en tokenautas.com , la cantidad de tokens a cambiar y presiona "Enviar Propina", toma un "pantallazo"... ¡Listo! ¡Lo haz logrado! <br />
                Para recibir tu dinero tienes regresa de nuevo a este dashboard y presiona el boton "WhatsApp"los tokens, y envianos el "pantallazo" que tomaste a nuestro whatsapp para desembolsarte tu dinero de inmediato ...
                </span>


              
              </label>
            
            </div>
            <button 
              onClick={handleLogin} 
              className='w-full py-2 mt-4 bg-black text-white rounded-md text-lg'
            > 
              ¡Ir a Chaturbate!
            </button>
           <p> <span>¡Importante!</span> Antes de enviar tus tokens verifica que estes en nuestro perfil chaturbate.com/tokenauta/</p>
            <div className='relative flex items-center justify-center mt-4'>
            <div className='absolute w-full border-t border-gray-300'></div>
       
          </div>
         
          </div>
        
        </div>
      </div>
    </div>
  );
  

}

export default Login;
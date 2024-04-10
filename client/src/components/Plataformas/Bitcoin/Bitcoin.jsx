import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoAutenticacion from '/fondos/bitcoin.webp';

const Bitcoin = () => {
  // Estados para manejar el correo electrónico y la contraseña ingresados por el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para almacenar la URL de la imagen de la billetera BTC
  const [walletBTCImage, setWalletBTCImage] = useState('');

  // Hook para la navegación programática
  const navigate = useNavigate();

  // Manejador del evento de inicio de sesión
  const handleLogin = async () => {
    try {
      console.log('Intentando iniciar sesión con:', email, password); // Mensaje de depuración
      // Petición al backend para iniciar sesión
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
  
      // Procesar la respuesta del backend
      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data);
        // Almacenar en localStorage que el usuario ha iniciado sesión
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', data.username);
        // Aquí podrías querer guardar el user_id en localStorage si es necesario
        // localStorage.setItem('userId', data.user_id);
        // Realizar una petición al backend para obtener la imagen de la billetera BTC
        const imageUrlResponse = await fetch(`http://localhost:3001/users/btc/${data.user_id}`);
        const imageUrlData = await imageUrlResponse.json();
        // Establecer la imagen de la billetera BTC en el estado
        setWalletBTCImage(imageUrlData.imagenbtc);
        // Navegar al dashboard
        navigate('/dashboard');
      } else {
        // Manejar un inicio de sesión fallido
        console.log('Error en el login:', response.statusText);
      }
    } catch (error) {
      // Manejar errores de la petición al backend
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Efecto para obtener la imagen de la billetera BTC al montar el componente
  useEffect(() => {
    // Asumiendo que el userId se almacena en localStorage después del inicio de sesión
    const userId = localStorage.getItem('userId');
    if (userId) {
      const fetchWalletImage = async () => {
        try {
          // Petición al backend para obtener la imagen de la billetera BTC
          const response = await fetch(`http://localhost:3001/users/btc/${userId}`);
          if (response.ok) {
            const data = await response.json();
            // Establecer la imagen de la billetera BTC en el estado
            setWalletBTCImage(data.imagenbtc);
          } else {
            // Manejar errores al obtener la imagen
            console.error('No se pudo obtener la imagen de la cartera BTC:', response.statusText);
          }
        } catch (error) {
          // Manejar errores de la petición al backend
          console.error('Error al conectar con el servidor para obtener la imagen BTC:', error);
        }
      };
      // Ejecutar la función asincrónica
      fetchWalletImage();
    }
  }, []);
  
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
        <h2 className='text-3xl font-bold text-center mb-8'>¿Como vender mis Bitcoin?</h2>
          <div className='flex flex-col space-y-4'>
          {walletBTCImage && <img src={walletBTCImage} alt="Wallet BTC" />}
          {console.log('walletBTCImage URL:', walletBTCImage)}
          
            
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

export default Bitcoin;
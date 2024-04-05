import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Importa las imágenes y logos que necesitas
import fondoAutenticacion from '/fondos/astronautaRegistro.webp';
import GOOGLE_ICON from "/logos/google.svg";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleRegister = async () => {
//START VALIDACIONES

//no permite enviar el formulario si esta vacio
if (!username.trim() || !password.trim()) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ambos campos son obligatorios!',
  });
  return;
}
//
  // Verifica si el nombre de usuario contiene "@"
  if (username.includes('@')) {
    Swal.fire({
      icon: 'warning', // Usa 'warning' para resaltar que es una advertencia
      title: 'Nombre de usuario inválido',
      text: 'Para registrarte con tu correo, presiona: REGISTRATE CON GOOGLE',
    });
    return; // Detiene la ejecución si el nombre de usuario es inválido
  }
  //

//END VALIDACIONES

    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        // Si el registro es exitoso, muestra el SweetAlert
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Serás redirigido para iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          // Si el usuario hace click en "Ok", cambia el estado para redirigir
          if (result.isConfirmed) {
            setRedirectToLogin(true);
          }
        });
      } else {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  // Si redirectToLogin es true, redirige al usuario al login
  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  // Renderiza el formulario de registro
  return (

    <div className='flex flex-col lg:flex-row w-full h-screen items-center lg:items-start'>
      <div className='w-full lg:w-1/2 h-full flex flex-col items-center lg:items-start'>
        <div className='absolute top-[25%] lg:top-[25%] left-0 lg:left-[10%] flex flex-col items-center lg:items-start'>
          <h1 className='text-4xl text-white font-bold my-4 text-center lg:text-left' >Aumenta tus ingresos con tokenautas</h1>
          <p className='text-xl text-white font-normal text-center lg:text-left'>Comienza ahora y disfruta de pagos instantáneos en tu cuenta bancaria</p>
        </div>
        <img src={fondoAutenticacion} alt="Fondo de autenticación" className='w-full h-full object-cover' />
      </div>
      
      <div className='w-full lg:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-4 lg:p-20 justify-between'>
        <h1 className='text-xl text-[#060606] font-semibold text-center'> Disfruta de nuestra plataforma intuitiva</h1>
        <div className='w-full flex flex-col max-w-[550px] mx-auto'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-2xl font-semibold mb-4 text-center'>Registrarse</h3>
            <p className='text-base mb-2 text-center'>¡Aqui podras registrarte!</p>
          </div>
        </div>
        <div className='w-full flex flex-col'>
      <input 
          type="text"
          placeholder='Alias o Nombre de Usuario'
          className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder='Contraseña'
          className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center'> 
            <input type="checkbox" className='w-4 h-4 mr-2' />
            <p className='text-sm'>Recordar siempre</p>
          </div>
          <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Olvidaste tu contraseña?</p>
        </div>
        <div className='w-full flex flex-col my-4'>
        {/*   <button className='w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center'> Registrarse </button>*/} 
        <button 
        onClick={handleRegister} 
        className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
      > 
        Registrarse 
      </button>

        
        </div>
        <div className='w-full flex items-center justify-center relative py-2'>
          <div className='w-full h-[1px] bg-black/40'></div>
          <p className='text-lg absolute -top-3 text-black/80 bg-[#f5f5f5] px-2'> o </p>
        </div>
        <button className='w-full text-[#060606] my-2 bg-white border-2 border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
          <img src={GOOGLE_ICON} width={25} alt="Google" className='h-6 mr-2'/> Registrate con Google 
        </button>
        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#060606]'>Ya tienes una cuenta? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Inicia sesion aquí!</span> </p>
        </div>
      </div>
    </div>
  )
}

export default Register;
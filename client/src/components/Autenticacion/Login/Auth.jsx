import React, { useState } from 'react';
import fondoAutenticacion from '/fondos/loginTokenautas.webp';
import GOOGLE_ICON from "/logos/google.svg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar el formulario mostrado

  // Función para intercambiar entre login y registro
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='flex flex-col lg:flex-row w-full h-screen items-center'>
      <div className={`w-full lg:w-1/2 h-full flex flex-col items-center ${isLogin ? 'lg:order-1' : 'lg:order-2'}`}>
        <img src={fondoAutenticacion} alt="Fondo de autenticación" className='w-full h-full object-cover' />
      </div>

      {isLogin ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegisterForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

const LoginForm = ({ toggleForm }) => {
  // Aquí va el mismo código de tu componente de login, agregando el botón de alternar al final:
  return (
    <div className='w-full lg:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-4 lg:p-20 justify-between'>
      {/* Contenido del formulario de login */}
      <button onClick={toggleForm} className='w-full text-[#060606] mt-4 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
        Registrarse
      </button>
    </div>
  );
};

const RegisterForm = ({ toggleForm }) => {
  return (
    <div className='w-full lg:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-4 lg:p-20 justify-between'>
      {/* Contenido del formulario de registro, asegúrate de incluir el nuevo input de tipo texto */}
      <input 
        type="text"
        placeholder='Nombre completo'
        className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
      />
      {/* Aquí continúa el resto de inputs (correo y contraseña, por ejemplo) */}
      <button onClick={toggleForm} className='w-full text-[#060606] mt-4 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
        Ingresar
      </button>
    </div>
  );
};

export default Auth;

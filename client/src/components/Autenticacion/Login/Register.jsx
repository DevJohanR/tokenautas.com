import React from 'react';
import fondoAutenticacion from '/fondos/astronautaRegistro.webp';
import GOOGLE_ICON from "/logos/google.svg";

const Register = () => {
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
            <h3 className='text-2xl font-semibold mb-4 text-center'>Ingresar</h3>
            <p className='text-base mb-2 text-center'>Bienvenido de nuevo. Por favor ingresa tus datos.</p>
          </div>
        </div>
        <div className='w-full flex flex-col'>
          <input 
            type="email"
            placeholder='Correo electrónico'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          />
          <input 
            type="password"
            placeholder='Contraseña'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
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
          <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'> Ingresar </button>
          <button className='w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center'> Registrarse </button>
        </div>
        <div className='w-full flex items-center justify-center relative py-2'>
          <div className='w-full h-[1px] bg-black/40'></div>
          <p className='text-lg absolute -top-3 text-black/80 bg-[#f5f5f5] px-2'> o </p>
        </div>
        <button className='w-full text-[#060606] my-2 bg-white border-2 border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
          <img src={GOOGLE_ICON} width={25} alt="Google" className='h-6 mr-2'/> Ingresar con Google 
        </button>
        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#060606]'>No tienes cuenta? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Regístrate aquí!</span> </p>
        </div>
      </div>
    </div>
  )
}

export default Register;













{/*import React from 'react'
import fondoAutenticacion from '/fondos/loginTokenautas.webp';
import GOOGLE_ICON from "/logos/google.svg"

const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disbaled: "#D9D9D9"
}

const Login = () => {
  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>


        <div className='absolute top-[25%] left-[10%] flex flex-col '>
          <h1 className='text-4x1 text-white font-bold my-4 ' >Aumenta tus ingresos con tokenautas</h1>
          <p className='text-x1 text-white font-normal'>Comienza ahora y disfruta de pagos instantaneos en tu cuenta bancaria</p>
        </div>


        <img src={fondoAutenticacion} className='w-full h-full object-cover' />
      </div>
      
      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
        <h1 className='text-x1 text-[#060606] font-semibold'> Disfruta de nuestra plataforma intuitiva</h1>


        <div className='w-full flex flex-col max-w-[550px] '>
          <div className='w-full flex flex-col mb-2'>


          <h3 className='text-2x1 font-semibold mb-4'>Ingresar</h3>
          <p className='text-base mb-2'>Bienvenido de nuevo. Por favor ingresa tus datos.</p>
          </div>
        </div>

       

        <div className='w-full flex flex-col '>
      
               <input 
          type="email"
          placeholder='Correo electronico'
          className=' w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none '
          />
               <input 
          type="password"
          placeholder='Contraseña'
          className=' w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none '
          />
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='w-full flex items-center'> 
            <input type="checkbox" className='w-4 h-4 mr-2' />
            <p className='text-sm'> Recordar siempre</p>
          </div>

          <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 '>Olvidaste tu contraseña?</p>

        </div>


        <div className='w-full flex flex-col my-4 '>
          <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer' > Ingresar </button>
          <button className='w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center ' > Registrarse </button>
     
        </div>

        <div className='w-full flex items-center justify-center relative py-2'>
          <div className='w-full h-[1px] bg-black/40 '></div>
          <p className='text-lg absolute text-black/80 bg-[#f5f5f5] '> o</p>
        </div>
        <button className='w-full text-[#060606] my-2 bg-white border-2 border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer ' > <img src={GOOGLE_ICON} width={25} alt="" className='h-6 mr-2' /> Ingresar con Google </button>
     

     
         



        <div className='w-full flex items-center justify-center'>
        <p className='text-sm font-normal text-[#060606]'> No tienes cuenta? <span className='font-semibold underline underline-offset-2 cursor-pointer '></span> Registrate aqui! </p>
        </div>
      </div>
      


    </div>
  )
}

export default Login */}

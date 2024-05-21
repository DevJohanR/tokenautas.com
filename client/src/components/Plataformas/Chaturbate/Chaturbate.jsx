import React from 'react';
import fondoAutenticacion from '/plataformasDashboard/chaturbate.png';
import fondoAutenticacion2 from '/plataformas/chaturbateInformacion.png';

const Chatur = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center min-h-screen w-screen'>
      <div className='relative w-full lg:w-1/2 h-[50vh] lg:h-screen bg-center bg-cover flex items-center justify-center' style={{ backgroundImage: `url(${fondoAutenticacion})` }}>
        <div className='absolute inset-0 bg-black opacity-50'></div> {/* Dark overlay */}
        <div className='relative text-center lg:text-left p-8 lg:p-0 lg:m-24'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl text-white font-bold'>Aumenta tus ingresos con tokenautas</h1>
          <strong>¡Importante!</strong> Antes de enviar tus tokens, verifica que estás en nuestro perfil <a href="https://chaturbate.com/tokenauta/" className="text-blue-500 underline">chaturbate.com/tokenauta/</a>
        </div>
      </div>
      <div className='w-full lg:w-1/2 h-auto lg:h-screen flex flex-col items-center justify-center bg-white'>
        <div className='w-full max-w-md p-4 sm:p-6 lg:p-8'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 lg:mb-8'>
            
          </h2>
          <div className='flex flex-col space-y-4'>
            <img src={fondoAutenticacion2} alt="Chaturbate info" className="object-contain w-full"/>
            <div className='flex items-center justify-center'>
              <label className='flex items-center space-x-2'>
                <span className='text-sm sm:text-base lg:text-lg text-justify text-gray-700 bg-blue-100 p-2 sm:p-3 lg:p-4 rounded-md'>
                  Ingresa a nuestro perfil en <a href="https://chaturbate.com" className="text-blue-500 underline">Chaturbate.com</a> y coloca el correo con el cual te registraste en <a href="https://tokenautas.com" className="text-blue-500 underline">tokenautas.com</a>, la cantidad de tokens a cambiar y presiona "Enviar Propina". Toma un "pantallazo"... ¡Listo! ¡Lo has logrado!<br /><br />
                  Para recibir tu dinero, regresa de nuevo a este dashboard y presiona el botón "WhatsApp". Envíanos el "pantallazo" que tomaste a nuestro WhatsApp para desembolsarte tu dinero de inmediato.
                </span>
              </label>
            </div>
            <button className='w-full py-2 mt-4 bg-black text-white rounded-md text-base sm:text-lg'>
              ¡Ir a Chaturbate!
            </button>
            <p className='text-red-600 mt-4 text-sm sm:text-base'>
           <br /><br />
            </p>
            <div className='relative flex items-center justify-center mt-4'>
              <div className='absolute w-full border-t border-gray-300'></div>
              <div className='relative z-10 px-4 bg-white text-xs lg:text-sm'>o</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatur;

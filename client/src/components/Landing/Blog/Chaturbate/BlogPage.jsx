import React from 'react';
import fondoAutenticacion from '/plataformasDashboard/chaturbate.png';
import fondoAutenticacion2 from '/plataformas/chaturbateInformacion.png';

const BlogPage = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center h-screen w-screen'>
      <div className='w-full lg:w-1/2 h-screen bg-center bg-cover flex items-center justify-center' style={{ backgroundImage: `url(${fondoAutenticacion})` }}>
        <div className='text-center lg:text-left p-8 lg:p-0 lg:m-24'>
          {/* <h1 className='text-4xl text-white font-bold mb-4'>Aumenta tus ingresos con tokenautas</h1>
          <p className='text-xl text-white'>Comienza ahora y disfruta de pagos instantáneos en tu cuenta bancaria</p> */}
        </div>
      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center bg-white'>
        <div className='w-full max-w-md p-8'>
          <h2 className='text-3xl font-bold text-center mb-8'>¿Cómo vender mis tokens de Chaturbate?</h2>
          <div className='flex flex-col space-y-4'>
            <img src={fondoAutenticacion2} alt="Información sobre Chaturbate" />
            <div className='flex items-center justify-center'>
              <label className='flex items-center space-x-2'>
                <span className='text-sm'>
                  Ingresa a nuestro perfil en Chaturbate.com y coloca el correo con el cual te registraste en tokenautas.com, la cantidad de tokens a cambiar y presiona "Enviar Propina". Toma un "pantallazo"... ¡Listo! ¡Lo has logrado! <br />
                  Para recibir tu dinero, regresa de nuevo a este dashboard y presiona el botón "WhatsApp". Envíanos el "pantallazo" que tomaste a nuestro WhatsApp para desembolsarte tu dinero de inmediato...
                </span>
              </label>
            </div>
            <p><strong>¡Importante!</strong> Antes de enviar tus tokens verifica que estés en nuestro perfil chaturbate.com/tokenauta/</p>
            <div className='relative flex items-center justify-center mt-4'>
              <div className='absolute w-full border-t border-gray-300'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

import React from 'react';
import Chatur from '../components/Plataformas/Chaturbate/Chaturbate';
import Menu from '../components/Dashboard/Menu/Menu';

const ChaturbatePage = () => {
  const paragraph = (
    <>
      Ingresa a nuestro perfil en <a href='https://chaturbate.com' className="text-blue-500 underline">Chaturbate.com</a> y escribe el correo con el cual te registraste en <a href='https://tokenautas.com' className="text-blue-500 underline">tokenautas.com</a>, <span> + </span> la cantidad de tokens y presiona "Enviar Propina". Toma un "pantallazo"... ¡Listo! ¡Lo has logrado!<br />
      Para recibir tu dinero, regresa de nuevo a este dashboard y presiona el botón "WhatsApp". Envíanos el "pantallazo" que tomaste a nuestro WhatsApp para desembolsarte tu dinero de inmediato. <span style={{ cursor: 'pointer' }}>Ver tutorial - Clic Aquí!</span>
    </>
  );

  return (
    <div className='chaturbatePage'>
      <Menu />
      <Chatur 
        fondoAutenticacion='/plataformasDashboard/chaturbate.png'
        chaturbateInfoImg='./plataformas/chaturbateInformacion.png'
        profileLink='https://chaturbate.com'
        tokenautasLink='https://tokenautas.com'
        whatsappLink='https://chaturbate.com/tokenauta/'
        paragraph={paragraph}
      />
    </div>
  );
}

export default ChaturbatePage;

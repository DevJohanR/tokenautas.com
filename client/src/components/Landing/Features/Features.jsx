import React from 'react';
import Feature from '../Containers/Features/Features';
import './features.css';
import { Link } from 'react-router-dom';

const featuresData = [
  {
    title: 'Pagos a terceros sin complicaciones',
    text: 'Con nuestro sistema avanzado, los usuarios pueden enviar regalos en forma de criptomonedas, que se almacenan automáticamente en billeteras asignadas por nuestro algoritmo. Los modelos pueden luego convertir estos tokens en moneda local y transferirlos directamente a sus cuentas bancarias. ',
  },
  {
    title: 'Historial de retiros',
    text: 'Accede a un registro detallado de todas tus transacciones y retiros en nuestra plataforma. Nuestro sistema de historial de retiros te permite revisar cada movimiento, asegurando transparencia y control total sobre tus fondos.'
},
{
    title: 'Registra cualquier banco y retira',
    text: 'Facilitamos el proceso de retiro permitiéndote registrar cualquier banco de tu preferencia. Una vez registrado, podrás transferir tus fondos de forma rápida y segura a tu cuenta bancaria. '
},

];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">Retira Rapido: Tus Ganancias en Menos de 24 Horas, Compruebalo ahora. ¡Registrate!</h1>
      <Link to="/register">
      <p>¡Registrate y Explora nuestra plataforma ahora!</p>
      </Link>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;

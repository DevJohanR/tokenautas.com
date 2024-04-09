import React from 'react';
import Menu from '../components/Dashboard/Menu/Menu';
import Container from '../components/Dashboard/Container/Container';
import GetUserImagenBTC from '../components/Dashboard/Funciones/GetUserImagenBTC';
import GetUImagenUSDT from '../components/Dashboard/Funciones/GetUImagenUSDT';


const DashboardUser = () => {
  return (
    <div>
         <Menu/>
         <Container/>
         Bienvenido {/* Aquí debe ir la lógica para mostrar el nombre del usuario en pantalla */}
         <GetUImagenUSDT userId="34" />
         <GetUserImagenBTC userId="34" />
    </div>
  );
};

export default DashboardUser;

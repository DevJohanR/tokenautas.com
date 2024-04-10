// src/components/Autenticacion/Login/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Este componente protege las rutas restringidas y redirige a los usuarios no autenticados
 * a la página de login.
 * Utiliza localStorage para verificar si el usuario está autenticado. En una aplicación
 * real, podrías querer reemplazar esto con un método más seguro.
 *
 * @param {{ children: JSX.Element }} props Los componentes hijos que se renderizarán si el usuario está autenticado.
 * @returns {JSX.Element} El componente hijo si el usuario está autenticado, o un componente `Navigate` que redirige al login si no lo está.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Ajusta esto según tu lógica de autenticación

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

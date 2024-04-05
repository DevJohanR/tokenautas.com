// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Importa tus componentes de página
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import DashboardUser from './routes/DashboardUserPage';

// Importa el componente ProtectedRoute
import ProtectedRoute from './components/Autenticacion/Login/ProtectedRoute.jsx'; // Ajusta la ruta de importación según tu estructura de directorios

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        {/* Protege la ruta /dashboard */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardUser/>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;

// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Importa tus componentes de página
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import Menu from './components/Dashboard/Menu/Menu.jsx';
import Container from './components/Dashboard/Container/Container.jsx';
import ChaturbatePage from './routes/ChaturbatePage.jsx';
import TetherPage from './routes/TetherPage.jsx';
import BitcoinPage from './routes/BitcoinPage.jsx';

// Importa el componente ProtectedRoute
import ProtectedRoute from './components/Autenticacion/Login/ProtectedRoute.jsx'; // Ajusta la ruta de importación según tu estructura de directorios

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/chaturbate' element={<ChaturbatePage/>} />
      {/* Protege la ruta /bitcoin con ProtectedRoute */}
      <Route path='/bitcoin' element={
          <ProtectedRoute>
            <BitcoinPage/>
          </ProtectedRoute>
        } />
        
        {/* Protege la ruta /bitcoin con ProtectedRoute */}
        <Route path='/tether' element={
          <ProtectedRoute>
           <TetherPage/>
          </ProtectedRoute>
        } />
        
        {/* Protege la ruta /dashboard con ProtectedRoute */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <>
              <Menu/>
              <Container/>
            </>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;

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
import TestPage from './routes/TestPage.jsx';
import RegistrarBancosPage from './routes/RegistrarBancosPage.jsx';
import RetirarPage from './routes/RetirarPage.jsx';
import BlogPage from './components/Landing/Blog/Chaturbate/BlogPage.jsx';
import Formulario from './components/Formulario/Formulario.jsx';
import AdminPanel from './components/Formulario/AdminPanel.jsx';
import UserDetail from './components/Formulario/UserDetail.jsx';
// Importa el componente ProtectedRoute
import ProtectedRoute from './components/Autenticacion/Login/ProtectedRoute.jsx'; // Ajusta la ruta de importación según tu estructura de directorios
import LoginSpace from './components/Formulario/LoginSpace.jsx';
import WhatsAppList from './components/Formulario/WhatsAppList.jsx';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
    
     
        <Route path='/test' element={<TestPage/>} />
        <Route path='/blogpage' element={<BlogPage/>} />
        <Route path='/login-space' element={<LoginSpace/>} />
        <Route path='/formulario' element={<Formulario/>} />

   {/* Protege la ruta /whatsapp anonimas con ProtectedRoute */}
   <Route path='/admin/whatsapp' element={
          <ProtectedRoute>
          <WhatsAppList />
          </ProtectedRoute>
        } />


         {/* Protege la ruta /administrador con ProtectedRoute */}
         <Route path='/administrador' element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        
        {/* Protege la ruta para UserDetail */}
        <Route path="/admin/:type/:email" element={
          <ProtectedRoute>
            <UserDetail />
          </ProtectedRoute>
        } />

   {/* Protege la ruta /RetirarPage con ProtectedRoute */}
   <Route path='/retirar' element={
          <ProtectedRoute>
          <RetirarPage/>
          </ProtectedRoute>
        } />


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

            {/* Protege la ruta /chaturbate con ProtectedRoute */}
            <Route path='/chaturbate' element={
          <ProtectedRoute>
           <ChaturbatePage/>
          </ProtectedRoute>
        } />

              {/* Protege la ruta /registrarBancos con ProtectedRoute */}
              <Route path='/registrarBancos' element={
          <ProtectedRoute>
        <RegistrarBancosPage/>
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

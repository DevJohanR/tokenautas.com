import { Routes,Route } from 'react-router-dom'
import './App.css'

import DashboardUser from './routes/DashboardUserPage'
import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'

function App() {

  return (
    <div className='App'>
     <Routes>
     <Route path='/' element={<HomePage/>} />
     <Route path='/login' element={<LoginPage/>} />
     <Route path='/register' element={<RegisterPage/>} />
      <Route path='/dashboard' element={<DashboardUser/>} />
     </Routes>
    </div>
  )
}

export default App

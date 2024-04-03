import { Routes,Route } from 'react-router-dom'
import './App.css'
import DashboardUser from './routes/DashboardUserPage'
import HomePage from './routes/HomePage'

function App() {

  return (
    <div className='App'>
     <Routes>
     <Route path='/' element={<HomePage/>} />
      <Route path='/dashboard' element={<DashboardUser/>} />
     </Routes>
    </div>
  )
}

export default App

//src/routes/BitcoinPage.jsx
import React from 'react'
import Tether from '../components/Plataformas/Tether/Tether'
import Menu from '../components/Dashboard/Menu/Menu'

const TetherPage = () => {
  return (
    <div className='tetherPage'>
   <Menu/>
  <Tether/>
    </div>
  )
}

export default TetherPage;
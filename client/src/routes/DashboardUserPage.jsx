import React from 'react'
import Menu from '../components/Dashboard/Menu/Menu'
import Container from '../components/Dashboard/Container/Container'


const DashboardUser = () => {
  return (
    <div>
         <Menu/>
         <Container/>
         Bienvenido {/* aqui debe estar la logica que muestra el usuario en pantalla */}
    </div>
  )
}

export default DashboardUser
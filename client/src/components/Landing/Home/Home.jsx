import React from 'react'
import Brand from '../Brand/Brand'
import CTA from '../CTA/CTA'
import Footer from '../Containers/Footer/Footer'
import Blog from '../Containers/Blog/Blog'
import Posibility from '../Containers/Possibility/Posibility'
import Features from '../Containers/Features/Features'
import WhatTokenautas from '../Containers/WhatTokenautas/WhatTokenautas'
import Header from '../Containers/Header/Header'
import Navbar from '../Navbar/Navbar'

const Home = () => {
  return (
    <div className='Home'>
      
      <div className="gradient__bg">
      <Navbar/>
      <Header/>
      </div>
     <Brand/>
     {/* <WhatTokenautas/>
      <Features/>
      <Posibility/>
      <CTA/>
      <Blog/>
      <Footer/>
      */} 
    
    </div>
  )
}

export default Home
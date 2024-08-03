import React from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import DriversJob from './components/DriversJob/DriversJob'
import OurServices from './components/OurServices/OurServices'
import About from './components/About/About'
import Request from './components/RequestBtn/Request'
import Explore from './components/Explore/Explore'
const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <DriversJob/>
      <OurServices/>
      <About/>
      {/* <Request/> */}
      <Explore/>
      
    </div>
  )
}

export default App

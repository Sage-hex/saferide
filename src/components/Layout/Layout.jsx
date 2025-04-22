import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'


const Layout = () => {
  return (
    <div>
      <Header/>

      <main>
        <Outlet/>
      </main>

      <Footer/>
    </div>
  )
}

export default Layout

// const BUY_CAKE = 'BUY_CAKE';

// {
//   type: BUY_CAKE,
//   payload: {
//     flavor: 'chocolate',
//     quantity: 10,
//   },
// }

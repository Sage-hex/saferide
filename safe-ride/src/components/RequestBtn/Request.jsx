import React from 'react'
import BlackBtn from '../Button/BlackBtn/BlackBtn'
import "./Request.css"
import GreenBtn from '../Button/GreenBtn/GreenBtn'

const Request = ({children}) => {
  return (
    <main className='main-request-container Request-custom'>
        {children}
        <h1>Make Your Request</h1>
        <article className="request-btn-container">
            <BlackBtn>Ride</BlackBtn>
            <GreenBtn>Delivery</GreenBtn>
        </article>

    </main>
  )
}

export default Request

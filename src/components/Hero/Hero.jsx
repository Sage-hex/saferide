import React from 'react'
import GreenBtn from '../Button/GreenBtn/GreenBtn'
import Carousel from '../Carousel/Carousel'
import "./Hero.css"

const Hero = () => {
  return (
    <section className='hero'>
        <article className='hero-content'>
            <aside className="details">   
            <h1 className='hero-title'>go everywhere, <br /> wherever</h1>
            <p className='hero-text'>Make SafeRide your no.1 safe platform for easy, <br /> quick and affordable transportation in our <br /> blessed country Nigeria.</p>
            <GreenBtn className="hero-btn">Ride now</GreenBtn>
            </aside>
        </article>
        <Carousel/>
      
    </section>
  )
}

export default Hero

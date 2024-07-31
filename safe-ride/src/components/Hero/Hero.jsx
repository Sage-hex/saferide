import React from 'react'
import GreenBtn from '../Button/GreenBtn/GreenBtn'
import Carousel from '../Carousel/Carousel'

const Hero = () => {
  return (
    <section className='Hero'>
        <article className='hero-content'>
            <h1>go everywhere, <br /> wherever</h1>
            <p>Make SafeRide your no.1 safe platform for easy, quick and affordable transportation in our blessed country Nigeria.</p>
            <GreenBtn>Ride now</GreenBtn>
        </article>
        <Carousel/>
      
    </section>
  )
}

export default Hero

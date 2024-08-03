import aboutimg from "../../assets/safe-ride-car.png"
import GreenBtn from "../Button/GreenBtn/GreenBtn"
import "./About.css"

const About = () => {
  return (
    <main className='about-section'>
        <section className='about-container'>
            <article className='about-img-container'>
                <img src={aboutimg} alt="About-us" />
            </article>
            <article className='about-details'>
                <h2>SafeRide</h2>
                <p>SafeRide is a Nigerian multinational transportation company that is located at various states in Nigeria. We’re making cities for people, offering better alternatives for every purpose a private car serves — including ride-hailing, shared cars, food delivery and business.
                </p>

                <GreenBtn>Learn More</GreenBtn>



            </article>


        </section>
      
    </main>
  )
}

export default About

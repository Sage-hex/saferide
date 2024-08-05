import './Footer.css'
import logo from "../../assets/Saferide.svg"
import { FaXTwitter,FaTiktok  } from "react-icons/fa6";
import { FaFacebook,FaLinkedinIn  } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import GreenBtn from '../Button/GreenBtn/GreenBtn';


const Footer = () => {
  return (
    <footer className='main-footer-container'>

        <section className="footer-inner-wrapper">

        <section className="footer-details">
            <article className='footer-logo-container'>
                <img src={logo} alt='logo' />
            </article>
            <article className='saferide-details'>
                <h3>SafeRide</h3>
                <p>Rides.</p>
                <p>Food delivery.</p>
                <p>Car-sharing.</p>
                <p>Business.</p>
            </article>
            <article className='safe-ride-partner'>
                <h3>Partner with SafeRide</h3>
                <p>Sign up as a driver</p>
                <p>Sign up for a ride</p>

            </article>
            <article className='safe-ride-company'>
                <h3>SafeRide Company</h3>
                <p>About us</p>
                <p>Contact us</p>
                <p>Blog</p>
            </article>

        </section>

        <section className="footer-social-container">
        <article className="footer-social-logo-container">

        <FaFacebook className='footer-social-logo'/>
        <FaXTwitter className='footer-social-logo' />
        <FiInstagram  className='footer-social-logo'/>
        <FaLinkedinIn className='footer-social-logo' />
        <FaTiktok className='footer-social-logo'/>
        </article>

        <article className="footer-form">
            <article className="form-wrapper">
                <input type="text" placeholder="Enter your email" />
                <GreenBtn>Subscribe</GreenBtn>
            </article>
        </article>
        </section>


        </section>
      
    </footer>
  )
}

export default Footer

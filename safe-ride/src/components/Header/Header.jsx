import BlackBtn from "../Button/BlackBtn/BlackBtn"
import "./Header.css"
import Logo from "../../assets/Saferide.svg";
import Hamburger from "hamburger-react"
import { useState } from "react";
const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((Open) => !isOpen);
    }
  return (
    <header className="header">
        <section className="header-container">
            <nav className="navbar">

                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="/">Ride</a></li>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/contact">Contact us</a></li>
                </ul>
                <Hamburger className="hamburger" toggled={isOpen} toggle={toggleMenu} />


            </nav>
                <div className="header-btn-container">
                    <button className="header-login" >Login</button>
                    <BlackBtn>Sign up</BlackBtn>
                </div>

        </section>

      
    </header>
  )
}

export default Header

import BlackBtn from "../../Button/BlackBtn/BlackBtn";
import "./Header.css";
import Logo from "../../../assets/Saferide.svg";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <section className="header-container">
        <nav className="navbar">
          <article className="logo">
            <Link to="/"> {/* Use Link for the home page */}
              <img src={Logo} alt="logo" />
            </Link>
          </article>

          <article className={`right-nav ${isOpen ? "is-open" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link to="/ride">Ride</Link> {/* Use Link for the /ride route */}
              </li>
              <li>
                <Link to="/about">About us</Link> {/* Use Link for the /about route */}
              </li>
              <li>
                <Link to="/contact">Contact us</Link> {/* Use Link for the /contact route */}
              </li>
            </ul>
            <article className="header-btn-container">
              <Link to="/login" className="header-login"> {/* Use Link for the /login route */}
                Login
              </Link>
              <Link to="/signup"> {/* Use Link for the /signup route */}
                <BlackBtn>Sign up</BlackBtn>
              </Link>
            </article>
          </article>
          <article className="hamburger">
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </article>
        </nav>
      </section>
    </header>
  );
};

export default Header;
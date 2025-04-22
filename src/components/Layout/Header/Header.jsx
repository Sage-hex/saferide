// import BlackBtn from "../Button/BlackBtn/BlackBtn"
// import "./Header.css"
// import Logo from "../../assets/Saferide.svg";
// import Hamburger from "hamburger-react"
// import { useState } from "react";
// const Header = () => {

//     const [isOpen, setIsOpen] = useState(false);
//     const toggleMenu = () => {
//         setIsOpen((open) => !open);
//     }
//   return (
//     <header className="header">
//         <section className="header-container">
//             <nav className="navbar">

//                 <div className="logo">
//                     <img src={Logo} alt="logo" />
//                 </div>
//                 <section className={`menu-items ${isOpen ? "is-open" : ''}`}>

//                 <ul className="nav-links">
//                     <li><a href="/">Ride</a></li>
//                     <li><a href="/about">About us</a></li>
//                     <li><a href="/contact">Contact us</a></li>
//                 </ul>
//                 </section>
//                 <Hamburger className="hamburger" onClick={toggleMenu} />

//             </nav>
//                 <div className="header-btn-container">
//                     <button className="header-login" >Login</button>
//                     <BlackBtn>Sign up</BlackBtn>
//                 </div>

//         </section>

//     </header>
//   )
// }

// export default Header

import BlackBtn from "../../Button/BlackBtn/BlackBtn";
import "./Header.css";
import Logo from "../../../assets/Saferide.svg";
import Hamburger from "hamburger-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen((isOpen) => !isOpen);
  //   // console.log("Menu toggled, isOpen:", !isOpen); // Check state
  // };

  return (
    <header className="header">
      <section className="header-container">
        <nav className="navbar">
          <article className="logo">
            <img src={Logo} alt="logo" />
          </article>

          
          <article className={`right-nav ${isOpen ? "is-open" : ""}`}>
            <ul className="nav-links">
              <li>
                <a href="/">Ride</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
            </ul>
          <article className="header-btn-container">
            <button className="header-login">Login</button>
            <BlackBtn>Sign up</BlackBtn>
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

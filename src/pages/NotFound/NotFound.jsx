import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img
        src="https://storyset.com/images/illustrations/404-not-found-with-people-holding-numbers.svg"
        alt="Page Not Found"
        className="notfound-image"
      />
      <h1 className="notfound-title">Lost in the clouds?</h1>
      <p className="notfound-description">
        The page you’re looking for doesn’t exist or was moved. Let’s get you back on track!
      </p>
      <Link to="/" className="notfound-button">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;


// Second design

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NotFound.css';

// const NotFound = () => {
//   return (
//     <section className="notfound-container">
//       <div className="notfound-content">
//         <h1 className="notfound-title">404</h1>
//         <h2 className="notfound-subtitle">Page Not Found</h2>
//         <p className="notfound-text">
//           Looks like you took a wrong turn. Let's help you find your way back to adventure!
//         </p>
//         <Link to="/" className="notfound-btn">
//           Back to Home
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default NotFound;

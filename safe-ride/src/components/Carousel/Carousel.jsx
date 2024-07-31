// import React, { useState } from "react";
// import "./Carousel.css"; 
// import image1 from "../../assets/Pics_of_woman"
// import image2 from "../../assets/Pics_of_man"

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const images = [
//     image1,
//     image2
//   ];

//   const nextImage = () => {
//     setCurrentIndex((currentIndex + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((currentIndex - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="carousel">
//       <button className="carousel-button left" onClick={prevImage}>
//         &lt;
//       </button>
//       <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
//       <button className="carousel-button right" onClick={nextImage}>
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState, useEffect } from "react";
import "./Carousel.css";
import image1 from "../../assets/Pics_of_woman.svg"
import image2 from "../../assets/Pics_of_man.svg"

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    image1,
    image2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex, images.length]);

  return (
    <div className="carousel">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
    </div>
  );
};

export default Carousel;

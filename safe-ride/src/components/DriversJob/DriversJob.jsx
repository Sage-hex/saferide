import GreenBtn from "../Button/GreenBtn/GreenBtn";
import "./DriversJob.css";
import driverImage from "../../assets/driver-job.jfif"
const DriversJob = () => {
  return (
    <section className="main-container">
        <h1 className="driver-job-text">
          Earn money with SafeRide as a driver
        </h1>
      <section className="driver-container-wrapper">
        <article className="image-container">
          <img src={driverImage} alt="driver" />
        </article>

        <article className="details-container">
          <h2>Drive and Earn money</h2>
          <p>
            With SafeRide drivers wil be able to earn <br /> and drive our generous
            customers <br /> to their various destination happily
          </p>
          <GreenBtn>Apply Now</GreenBtn>
        </article>
      </section>
    </section>
  );
};

export default DriversJob;


// import React, { useEffect, useState } from 'react';
// import GreenBtn from "../Button/GreenBtn/GreenBtn";
// import "./DriversJob.css";
// import driverImage from "../../assets/driver-job.jfif";

// const DriversJob = () => {
//     const [scrollY, setScrollY] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrollY(window.scrollY);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <section className="main-container" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
//             <h1 className="driver-job-text">
//                 Earn money with SafeRide as a driver
//             </h1>
//             <section className="driver-container-wrapper">
//                 <article className="image-container">
//                     <img src={driverImage} alt="driver" />
//                 </article>
//                 <article className="details-container">
//                     <h2>Drive and Earn money</h2>
//                     <p>
//                         With SafeRide, drivers will be able to earn <br /> and drive our generous
//                         customers <br /> to their various destinations happily
//                     </p>
//                     <GreenBtn>Apply Now</GreenBtn>
//                 </article>
//             </section>
//         </section>
//     );
// };

// export default DriversJob;


// import { useEffect } from 'react';
// import GreenBtn from "../Button/GreenBtn/GreenBtn";
// import "./DriversJob.css";
// import driverImage from "../../assets/driver-job.jfif";

// const DriversJob = () => {
//   useEffect(() => {
//     const handleScroll = () => {
//       const imageContainer = document.querySelector('.image-container');
//       const detailsContainer = document.querySelector('.details-container');
      
//       const triggerPoint = window.innerHeight * 0.75; // Adjust as needed

//       if (imageContainer.getBoundingClientRect().top < triggerPoint) {
//         imageContainer.classList.add('visible');
//         imageContainer.style.animation = 'wobble 1s ease-out';
//       }
      
//       if (detailsContainer.getBoundingClientRect().top < triggerPoint) {
//         detailsContainer.classList.add('visible');
//         detailsContainer.style.animation = 'wobble 1s ease-out';
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Trigger check on initial load

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <section className="main-container">
//         <h1 className="driver-job-text">
//           Earn money with SafeRide as a driver
//         </h1>
//       <section className="driver-container-wrapper">
//         <article className="image-container">
//           <img src={driverImage} alt="driver" />
//         </article>

//         <article className="details-container">
//           <h2>Drive and Earn money</h2>
//           <p>
//             With SafeRide drivers will be able to earn and drive our generous
//             customers to their various destinations happily.
//           </p>
//           <GreenBtn>Apply Now</GreenBtn>
//         </article>
//       </section>
//     </section>
//   );
// };

// export default DriversJob;

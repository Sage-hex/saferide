import React from "react";
import "./OurServices.css";
import image1 from "../../assets/rides 1.png";
import image3 from "../../assets/delivery 1.png";
import image2 from "../../assets/car-sharing 1.png";
import image4 from "../../assets/business 1.png";

const OurServices = () => {
  return (
    <section className="services-container">
      <h1 className="services-title">our services</h1>
      <p className="services-text">
        Try any of our services to know the reliability and genuineness
      </p>
      <section className="services-container-wrapper">
        <section className="service-wrapper one">
          <article className="service-container-one one">
            <article className="service-container-one-title one">
              <h2>Rides</h2>
              <p>Request and get a quick <br />and safe ride</p>
            </article>
            <article className="service-container-one-img one">
              <img src={image1} alt="bg-one" />
            </article>
          </article>
          <article className="service-container-one two">
            <article className="service-container-one-title two">
              <h2>Delivery</h2>
              <p>SafeRide makes car renting
                easy</p>
            </article>
            <article className="service-container-one-img two img-two">
              <img src={image2} alt="bg-one" />
            </article>
          </article>
        </section>
        <section className="service-wrapper two">
          <article className="service-container-one three">
            <article className="service-container-one-title three">
              <h2>Car-sharing</h2>
              <p>Choose your favorite food,
                delivered fast</p>
            </article>
            <article className="service-container-one-img three img-three">
              <img src={image3} alt="bg-one" />
            </article>
          </article>
          <article className="service-container-one four">
            <article className="service-container-one-title four">
              <h2>Business</h2>
              <p>Partner with reliable and
                safe company</p>
            </article>
            <article className="service-container-one-img four img-two">
              <img src={image4} alt="bg-one" />
            </article>
          </article>
        </section>
      </section>
    </section>
  );
};

export default OurServices;

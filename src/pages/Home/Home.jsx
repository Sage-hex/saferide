import React from 'react';

import Header from '../../components/Layout/Header/Header';
import Hero from '../../components/Hero/Hero';
import DriversJob from '../../components/DriversJob/DriversJob';
import OurServices from '../../components/OurServices/OurServices';
import About from '../../components/About/About';
import Request from '../../components/RequestBtn/Request';
import Explore from '../../components/Explore/Explore';
import Footer from '../../components/Layout/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Hero />
      <DriversJob />
      <OurServices />
      <About />
      {/* <Request /> */}
      <Explore />
    </div>
  );
};

export default Home;

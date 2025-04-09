import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import Collections from '../components/Collections';
import NewsletterSingup from '../components/NewsletterSingup';
import Footer from '../components/Footer';
import OurPolicy from '../components/OurPolicy';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BestSellers />
      <Collections />
      <OurPolicy/>
      <NewsletterSingup />
      <Footer />
    </div>
  );
};

export default Home;
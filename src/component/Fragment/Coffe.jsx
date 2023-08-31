import React from 'react'
import NavigationBar from '../Elements/NavigasiBar/NavigationBar';
import HeroSection from '../Elements/HeroSection/HeroSection';
import Footer from "../Elements/Footer/Footer";
import ProductCoffe from '../Elements/ProductItems/ProductCoffe';
import CoffeSlide from '../Elements/ProductSlide/CoffeSlide/CoffeSlide';

const Coffe = () => {
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar />
      <HeroSection />
      <ProductCoffe title="Coffe" />
      <CoffeSlide />
      <Footer />
    </div>
  )
}

export default Coffe
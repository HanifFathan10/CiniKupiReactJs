import React from 'react'
import NavigationBar from '../Elements/NavigasiBar/NavigationBar';
import HeroSection from '../Elements/HeroSection/HeroSection';
import Footer from "../Elements/Footer/Footer";
import ProductDessert from '../Elements/ProductItems/ProductDessert';
import DessertSlide from '../Elements/ProductSlide/DessertSlide/DessertSlide';

const Dessert = () => {
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar />
      <HeroSection />
      <ProductDessert title="Dessert" />
      <DessertSlide />
      <Footer />
    </div>
  )
}

export default Dessert
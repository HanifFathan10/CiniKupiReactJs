import React from 'react'
import NavigationBar from '../Elements/NavigasiBar/NavigationBar';
import HeroSection from '../Elements/HeroSection/HeroSection';
import Footer from "../Elements/Footer/Footer";
import ProductDrink from '../Elements/ProductItems/ProductDrink';
import DrinkSlide from '../Elements/ProductSlide/DrinkSlide/DrinkSlide';

const Drink = () => {
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar />
      <HeroSection />
      <ProductDrink title="Drink" />
      <DrinkSlide />
      <Footer />
    </div>
  )
}

export default Drink;
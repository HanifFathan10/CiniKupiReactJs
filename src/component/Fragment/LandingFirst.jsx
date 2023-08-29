import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import ProdakSlide from "../Elements/ProductSlide/ProdakSlide";
import Footer from "../Elements/Footer/Footer";
import HeroSection from "../Elements/HeroSection/HeroSection";
import ProductItems from "../Elements/ProductItems/ProductItems";

const LandingFirst = () => {
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar />
      <HeroSection />
      <ProductItems title="Product" />
      <ProdakSlide />
      <Footer />
    </div>
  );
};

export default LandingFirst;

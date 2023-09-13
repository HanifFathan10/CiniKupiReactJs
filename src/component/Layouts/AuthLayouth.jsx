import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import HeroSection from "../Elements/HeroSection/HeroSection";
import Footer from "../Elements/Footer/Footer";

const AuthLayouth = (props) => {
  const { children, trigger } = props;
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar />
      <HeroSection />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayouth;

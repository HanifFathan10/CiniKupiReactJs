import React, { useEffect } from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import HeroSection from "../Elements/HeroSection/HeroSection";
import Footer from "../Elements/Footer/Footer";
import { useNavigate } from "react-router-dom";

const AuthLayouth = ({ children }) => {
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesToken");
    if (!token) {
      Navigate("/login");
    }
  }, []);
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

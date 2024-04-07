import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useScrollTop } from "../../Hooks/useScrollTop";

const AuthLayouth = ({ children }) => {
  useScrollTop();
  return (
    <div className="min-h-screen w-full text-white">
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayouth;

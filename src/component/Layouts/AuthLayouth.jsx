import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useScrollTop } from "../../Hooks/useScrollTop";

const AuthLayouth = ({ children }) => {
  useScrollTop();
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar color={"#ffffff"} background={"bg-light"} />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayouth;

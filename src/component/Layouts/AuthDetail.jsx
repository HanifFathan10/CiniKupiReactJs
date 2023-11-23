import React, { useEffect } from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useNavigate } from "react-router-dom";
import PopUpOrder from "../Elements/PopUpOrder/PopUpOrder";

const AuthDetail = ({ children }) => {
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      Navigate("/login");
    }
  }, []);
  return (
    <div className="w-full">
      <NavigationBar classname={"text-[#ffffff]"} color={"#ffffff"} />
      {children}
      <Footer />
      <PopUpOrder />
    </div>
  );
};

export default AuthDetail;

import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import PopUpOrder from "../Elements/PopUpOrder/PopUpOrder";
import { useScrollTop } from "../../Hooks/useScrollTop";

const AuthDetail = ({ children }) => {
  useScrollTop();
  return (
    <div className="w-full">
      <NavigationBar
        classname={"text-[#ffffff]"}
        color={"#ffffff"}
        background={"bg-light"}
      />
      {children}
      <Footer />
      <PopUpOrder />
    </div>
  );
};

export default AuthDetail;

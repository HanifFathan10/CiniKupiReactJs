import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";

const AuthDetail = ({children}) => {
  return (
    <div className="w-full min-h-screen">
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
};

export default AuthDetail;

import React, { useEffect } from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { RefreshToken } from "../../services/AuthService";

const AuthLayouth = ({ children }) => {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    RefreshToken((status, res) => {
      if (status === true) {
        sessionStorage.setItem("access_token", res.data.access_token);
        window.location.reload();
      }
    });
  }

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

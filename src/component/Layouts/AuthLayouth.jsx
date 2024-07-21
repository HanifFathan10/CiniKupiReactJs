import React, { useEffect } from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { RefreshToken } from "../../services/AuthService";
import BubbleChatAI from "../Fragment/BubbleChatAI";

const AuthLayouth = ({ children }) => {
  const token = sessionStorage.getItem("access_token");

  if (token) {
    useEffect(() => {
      if (!token) {
        RefreshToken((status, res) => {
          if (status === true) {
            sessionStorage.setItem("access_token", res.data.access_token);
            window.location.reload();
          }
        });
      }
    }, [token]);
  }

  useScrollTop();
  return (
    <div className="relative min-h-screen w-full text-white">
      <NavigationBar />
      {children}
      <Footer />
      {token && <BubbleChatAI />}
    </div>
  );
};

export default AuthLayouth;

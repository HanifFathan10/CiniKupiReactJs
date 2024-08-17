import * as React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useScrollTop } from "../../Hooks/useScrollTop";
import BubbleChatAI from "../Fragment/BubbleChatAI";

const AuthLayouth = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("access_token");

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

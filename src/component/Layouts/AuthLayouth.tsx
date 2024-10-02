import * as React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import { useScrollTop } from "../../Hooks/useScrollTop";
import BubbleChatAI from "../Fragment/BubbleChatAI";
import MainLayout from "./MainLayout";

interface AuthLayouthProps {
  children: React.ReactNode;
}

const AuthLayouth = ({ children }: AuthLayouthProps) => {
  const token = sessionStorage.getItem("access_token");

  useScrollTop();
  return (
    <MainLayout>
        <NavigationBar />
        {children}
        <Footer />
        {token && <BubbleChatAI />}
    </MainLayout>
  );
};

export default AuthLayouth;

import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import MenuList from "../Elements/Menu/MenuList/MenuList";
import PopUpOrder from "../Elements/PopUpOrder/PopUpOrder";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { kebabToTitleCase } from "../../utils/kebabToTitleCase";
import MainLayout from "./MainLayout";

interface AuthMenuProps {
  children: React.ReactNode;
  title: string;
}

const AuthMenu = ({ children, title }: AuthMenuProps) => {
  useScrollTop();

  return (
    <MainLayout>
      <NavigationBar />
      <div className="item-center bg-primary flex min-h-screen w-full justify-center">
        <div className="container mt-24 flex text-white/90">
          <nav className="mx-16 hidden lg:block">
            <ul>
              <li className="mt-6">
                <MenuList />
              </li>
            </ul>
          </nav>
          <div className="w-full px-3 py-1 md:px-16 lg:w-4/6 lg:py-6">
            <h1 className="text-2xl font-bold">{kebabToTitleCase(title)}</h1>
            {children}
          </div>
        </div>
      </div>
      <Footer />
      <PopUpOrder />
    </MainLayout>
  );
};

export default AuthMenu;

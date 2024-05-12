import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import MenuList from "../Elements/Menu/MenuList/MenuList";
import PopUpOrder from "../Elements/PopUpOrder/PopUpOrder";
import { useScrollTop } from "../../Hooks/useScrollTop";

const AuthMenu = ({ children, title }) => {
  useScrollTop();
  return (
    <div className="min-h-screen w-full text-white">
      <NavigationBar />
      <div className="item-center flex min-h-screen w-full justify-center border border-x-4 bg-[#ffffff]">
        <div className="container mt-24 flex text-black">
          <nav className="mx-16 hidden lg:block">
            <ul>
              <li className="mt-6">
                <MenuList />
              </li>
            </ul>
          </nav>
          <div className="w-full px-3 py-1 md:px-16 lg:w-4/6 lg:py-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            {children}
          </div>
        </div>
      </div>
      <Footer />
      <PopUpOrder />
    </div>
  );
};

export default AuthMenu;

import React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import MenuList from "../Elements/Menu/MenuList/MenuList";
import PopUpOrder from "../Elements/PopUpOrder/PopUpOrder";
import { useScrollTop } from "../../Hooks/useScrollTop";

const AuthMenu = ({ children, title }) => {
  useScrollTop();
  return (
    <div className="text-white w-full min-h-screen">
      <NavigationBar
        classname={"text-dark"}
        color={"text-dark"}
        background={"bg-dark"}
      />
      <div className="bg-[#ffffff] flex justify-center item-center min-h-screen border border-x-4 w-full">
        <div className="mt-24 text-dark container flex">
          <nav className="hidden lg:block mx-16">
            <ul>
              <li className="mt-6">
                <MenuList />
              </li>
            </ul>
          </nav>
          <div className="py-1 px-3 md:px-16 lg:py-6 w-full lg:w-4/6">
            <h1 className="font-bold text-2xl">{title}</h1>
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

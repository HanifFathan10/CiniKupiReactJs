import React from "react";
import Navigasi from "./Navigasi";
import { Logo } from "../Logo/Logo";

const NavigationBar = () => {
  return (
      <nav className="fixed z-[9999] w-full bg-transparent max-w-[1440px]">
        <div className="flex items-center justify-between rounded-full bg-chocolate px-7 py-3 text-white md:w-full md:justify-between md:px-4">
          <Logo />
          <Navigasi />
        </div>
      </nav>
  );
};

export default NavigationBar;

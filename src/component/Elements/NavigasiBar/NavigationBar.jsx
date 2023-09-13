import React from "react";
import { Logo } from "../Logo/Logo";
import Navigasi from "./Navigasi";

const NavigationBar = () => {
  return (
    <>
      <div className="shadow-lg w-full fixed top-0 left-0 border-b-slate-600 z-[9999]">
        <div className="md:flex items-center justify-between py-4 px-7 md:px-10">
          <div className="flex gap-2 text-lg">
            <Logo />
          </div>
          <Navigasi />
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

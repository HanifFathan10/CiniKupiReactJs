import * as React from "react";
import Navigasi from "./Navigasi";
import { Logo } from "../Logo/Logo";

const NavigationBar = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-[9999] w-full px-2 py-2">
        <div className="flex items-center justify-between rounded-full bg-primary px-7 py-3 text-white md:w-full md:justify-between md:px-4">
          <Logo />
          <Navigasi />
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

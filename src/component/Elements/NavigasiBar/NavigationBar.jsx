import React from "react";
import { Logo } from "../Logo/Logo";
import Navigasi from "./Navigasi";
import Button from "../Button/Button";

const NavigationBar = () => {
  const handleLogout = (e) => {
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    window.location.href = "/login"
  }
  return (
    <>
      <div className="shadow-lg w-full fixed top-0 left-0 border-b-slate-600 z-[9999]">
        <div className="flex items-center w-[65%] justify-between md:w-full md:justify-between py-4 px-7 md:px-10">
          <div className="flex gap-2 text-lg">
            <Logo />
          </div>
          <Navigasi />
          <Button onClick={handleLogout} background="text-slate-400 hover:text-red-500 transition duration-300 text-lg bg-transparent hover:bg-transparent font-semibold" text="Logout"/>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

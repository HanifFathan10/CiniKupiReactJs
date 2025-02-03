import React, { useEffect, useState } from "react";
import Navigasi from "./Navigasi";
import { Logo } from "../Logo/Logo";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 75);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed left-1/2 top-10 z-[9999] flex w-full max-w-[1536px] -translate-x-1/2 -translate-y-1/2 transform px-7 py-3 text-white md:justify-between md:px-4 ${isScrolled ? "md:backdrop-blur-md" : "bg-transparent"}`}
    >
      <Logo />
      <Navigasi />
    </nav>
  );
};

export default NavigationBar;

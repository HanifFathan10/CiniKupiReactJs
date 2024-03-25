import React, { useEffect } from "react";
import { useState } from "react";
import NavigasiList from "./NavigasiList/NavigasiList";

const Navigasi = ({ background }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (event.target.closest(".toggle-button") === null) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleToggleClick = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <div
        onClick={handleToggleClick}
        className="toggle-button absolute right-5 top-5 flex cursor-pointer flex-col text-2xl md:hidden"
      >
        <span
          className={`${background} my-[2px] h-[4px] w-6 transition-all duration-300 ${
            open && "origin-top-left rotate-45"
          }`}
        ></span>
        <span
          className={`${background} my-[2px] h-[4px] w-6 transition-all duration-300 ${
            open && "scale-0"
          }`}
        ></span>
        <span
          className={`${background} my-[2px] h-[4px] w-6 transition-all duration-300 ${
            open && "origin-bottom-left -rotate-45"
          }`}
        ></span>
      </div>
      <ul
        className={`md:text-md absolute right-4 w-full max-w-[125px] rounded-lg bg-[#212121] pb-2 pl-6 text-sm transition-all duration-700 ease-in-out md:static md:z-auto md:flex md:w-auto md:max-w-full md:items-center md:bg-transparent md:pb-0 md:pl-0 ${
          open ? "top-20 opacity-100" : "left-[700px] opacity-0 md:opacity-100"
        }`}
      >
        <NavigasiList
          classnameLi="md:ml-8 md:my-0 my-5"
          classnameA="text-md max-md:text-[#ffffff] font-semibold px-2 hover:text-slate-600 duration-500"
        />
      </ul>
    </>
  );
};

export default Navigasi;

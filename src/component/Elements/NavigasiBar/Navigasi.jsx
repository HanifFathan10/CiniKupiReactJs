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
        className="text-2xl absolute right-5 top-5 cursor-pointer md:hidden flex flex-col toggle-button"
      >
        <span
          className={`${background} w-6 h-[4px] my-[2px] transition-all duration-300 ${
            open && "origin-top-left rotate-45"
          }`}
        ></span>
        <span
          className={`${background} w-6 h-[4px] my-[2px] transition-all duration-300 ${
            open && "scale-0"
          }`}
        ></span>
        <span
          className={`${background} w-6 h-[4px] my-[2px] transition-all duration-300 ${
            open && "origin-bottom-left -rotate-45"
          }`}
        ></span>
      </div>
      <ul
        className={`md:flex md:items-center bg-[#212121] max-w-[125px] text-sm md:text-md md:pb-0 pb-2 absolute md:max-w-full md:static md:z-auto right-4 w-full md:w-auto md:bg-transparent rounded-lg md:pl-0 pl-6 transition-all duration-700 ease-in-out ${
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
